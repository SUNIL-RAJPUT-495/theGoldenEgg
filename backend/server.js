import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import { connectDB } from './config/db.js';
import { Product, Category, Coupon, Banner, User, Inquiry, Payment } from './models/index.js';

// Modular Route Imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import inquiryRoutes from './routes/inquiries.js';
import couponRoutes from './routes/coupons.js';
import bannerRoutes from './routes/banners.js';
import analyticsRoutes from './routes/analytics.js';

const app = express();

// Middlewares
const allowedOrigins = [
  'http://thegoldenegg.co.in',
  'https://thegoldenegg.co.in',
  'http://www.thegoldenegg.co.in',
  'https://www.thegoldenegg.co.in',
  'http://api.thegoldenegg.co.in',
  'https://api.thegoldenegg.co.in',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Modular API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'The Golden Egg Modular E-Commerce API is running...' });
});

const seedDefaultAdmin = async () => {
  try {
    const adminEmail = 'admin@thegoldenegg.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'The Golden Egg Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        phone: '7411932830',
        verified: true
      });
      console.log('✅ Default admin account initialized: admin@thegoldenegg.com / admin123');
    }
  } catch (err) {
    console.error('⚠️ Could not seed admin account:', err.message);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedDefaultAdmin();
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
});

export default app;
