import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class LocalCollection {
  constructor(name) {
    this.name = name;
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data || '[]');
    } catch (e) {
      console.error(`Error reading ${this.name}:`, e);
      return [];
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`Error writing ${this.name}:`, e);
    }
  }

  async find(filter = {}) {
    const items = this.read();
    return items.filter(item => {
      for (let key in filter) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(filter = {}) {
    const items = this.read();
    return items.find(item => {
      for (let key in filter) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    }) || null;
  }

  async findById(id) {
    const items = this.read();
    return items.find(item => item._id === id || item.id === id) || null;
  }

  async create(data) {
    const items = this.read();
    const newItem = {
      _id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    items.push(newItem);
    this.write(items);
    return newItem;
  }

  async findByIdAndUpdate(id, updateData, options = { new: true }) {
    const items = this.read();
    const index = items.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    
    // Support mongoose-like atomic updates or plain replacements
    const current = items[index];
    const updated = {
      ...current,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    items[index] = updated;
    this.write(items);
    return updated;
  }

  async findByIdAndDelete(id) {
    const items = this.read();
    const index = items.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    const deleted = items.splice(index, 1)[0];
    this.write(items);
    return deleted;
  }

  async countDocuments(filter = {}) {
    const matches = await this.find(filter);
    return matches.length;
  }
}

export const localDb = {
  Users: new LocalCollection('users'),
  Products: new LocalCollection('products'),
  Categories: new LocalCollection('categories'),
  Orders: new LocalCollection('orders'),
  Coupons: new LocalCollection('coupons'),
  Reviews: new LocalCollection('reviews'),
  Banners: new LocalCollection('banners'),
  Addresses: new LocalCollection('addresses'),
  Inquiries: new LocalCollection('inquiries'),
  Payments: new LocalCollection('payments')
};
