import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { Product, Category, Coupon, Banner, User } from './database/models.js';

// Route Imports
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import couponRoutes from './routes/coupons.js';
import bannerRoutes from './routes/banners.js';
import analyticsRoutes from './routes/analytics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'The Golden Egg E-Commerce API is running...' });
});

// Seed Initial Data function
const seedInitialData = async () => {
  try {
    // 1. Seed admin and demo customer if none exist
    const adminUser = await User.findOne({ email: 'admin@thegoldenegg.com' });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const adminPassword = await bcrypt.hash('admin123', salt);
      const customerPassword = await bcrypt.hash('customer123', salt);

      await User.create({
        name: 'The Golden Egg Admin',
        email: 'admin@thegoldenegg.com',
        password: adminPassword,
        role: 'admin',
        phone: '9876543210',
        verified: true
      });

      await User.create({
        name: 'Ramesh Kumar',
        email: 'customer@thegoldenegg.com',
        password: customerPassword,
        role: 'customer',
        phone: '9876543211',
        verified: true
      });

      console.log('🌱 Seeded Demo Users: admin@thegoldenegg.com / admin123, customer@thegoldenegg.com / customer123');
    }

    // 2. Seed Categories
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount === 0) {
      await Category.create({
        name: 'Organic Flours',
        description: 'Nutritious stone-ground flours loaded with health benefits.',
        image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=400&q=80'
      });
      console.log('🌱 Seeded Categories (Organic Flours only).');
    }

    // 3. Seed Banners
    const bannersCount = await Banner.countDocuments();
    if (bannersCount === 0) {
      await Banner.create({
        title: 'Goodness of Superfood',
        subtitle: '100% Certified Organic Ragi Flour milled to perfection',
        imageUrl: '/ragi_flour_banner.png',
        linkUrl: '/products',
        active: true
      });
      await Banner.create({
        title: 'Great Taste, Great Health',
        subtitle: 'Dosa, Roti, Cookies, Porridge, and Ragi Balls',
        imageUrl: '/ragi_flour_banner.png',
        linkUrl: '/products',
        active: true
      });
      console.log('🌱 Seeded Home Banners.');
    }

    // 4. Seed Coupons
    const couponsCount = await Coupon.countDocuments();
    if (couponsCount === 0) {
      await Coupon.create({
        code: 'WELCOME10',
        discountType: 'percentage',
        value: 10,
        minOrderValue: 200,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        active: true
      });
      await Coupon.create({
        code: 'SUPERFOOD',
        discountType: 'flat',
        value: 100,
        minOrderValue: 500,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        active: true
      });
      console.log('🌱 Seeded Coupons (WELCOME10, SUPERFOOD).');
    }

    // 5. Seed Products
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      // Product 1: Ragi Flour 5KG
      await Product.create({
        name: 'Organic Ragi Flour (5KG)',
        description: 'Our Certified Organic Ragi Flour (Finger Millet) is loaded with calcium, iron, and dietary fiber. Milled from carefully selected premium organic grains, it is gluten-free and 100% natural. Goodness of Superfood directly from Doddanna Ichahalli Village, Gonikoppa Road, Periyapatna, Mysore.',
        category: 'Organic Flours',
        price: 450,
        stock: 60,
        images: [
          'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          dietaryFiber: '35g (140% DV)',
          sugar: '7.2g',
          protein: '13g (26% DV)',
          vitaminA: '580%',
          vitaminC: '1%',
          calcium: '33%',
          iron: '96%'
        },
        ingredients: '100% Organic Finger Millet (Ragi) Flour. No preservatives or chemical additives.',
        reviewsCount: 2,
        averageRating: 4.8
      });

      // Product 2: Ragi Flour 2KG
      await Product.create({
        name: 'Organic Ragi Flour (2KG)',
        description: 'Premium organic finger millet flour stone-ground to preserve all natural fibers, vitamins, and minerals. Loaded with calcium and iron, ideal for daily rotis, porridge, and dosas.',
        category: 'Organic Flours',
        price: 190,
        stock: 80,
        images: [
          'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          dietaryFiber: '35g (140% DV)',
          sugar: '7.2g',
          protein: '13g (26% DV)',
          vitaminA: '580%',
          vitaminC: '1%',
          calcium: '33%',
          iron: '96%'
        },
        ingredients: '100% Organic Finger Millet (Ragi) Flour.',
        reviewsCount: 1,
        averageRating: 4.5
      });

      // Product 3: Ragi Flour 1KG
      await Product.create({
        name: 'Organic Ragi Flour (1KG)',
        description: '100% stone-ground premium Ragi Flour. Perfect for making traditional ragi balls, nutritious porridge, and soft rotis.',
        category: 'Organic Flours',
        price: 99,
        stock: 120,
        images: [
          'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          dietaryFiber: '35g (140% DV)',
          sugar: '7.2g',
          protein: '13g (26% DV)',
          vitaminA: '580%',
          vitaminC: '1%',
          calcium: '33%',
          iron: '96%'
        },
        ingredients: '100% Organic Finger Millet (Ragi) Flour.',
        reviewsCount: 3,
        averageRating: 4.9
      });

      console.log('🌱 Seeded Organic Ragi Packs.');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  seedInitialData().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  });
});
