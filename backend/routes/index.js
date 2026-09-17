import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import productRoutes from './products.js';
import orderRoutes from './orders.js';
import paymentRoutes from './payments.js';
import inquiryRoutes from './inquiries.js';
import couponRoutes from './coupons.js';
import bannerRoutes from './banners.js';
import analyticsRoutes from './analytics.js';

const apiRouter = express.Router();

// Mount all modular routes under single centralized API router
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/payments', paymentRoutes);
apiRouter.use('/inquiries', inquiryRoutes);
apiRouter.use('/coupons', couponRoutes);
apiRouter.use('/banners', bannerRoutes);
apiRouter.use('/analytics', analyticsRoutes);

export default apiRouter;
