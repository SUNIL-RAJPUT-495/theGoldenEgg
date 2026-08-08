import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

let useLocalDb = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('⚠️  No MONGODB_URI found in environment variables. Falling back to local JSON database.');
    useLocalDb = true;
    return { useLocalDb: true };
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 
    });
    console.log('✅ Connected to MongoDB successfully.');
    return { useLocalDb: false };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Falling back to local JSON database.');
    useLocalDb = true;
    return { useLocalDb: true };
  }
};

export const isLocalDb = () => useLocalDb;
export const setLocalDb = (val) => { useLocalDb = val; };
