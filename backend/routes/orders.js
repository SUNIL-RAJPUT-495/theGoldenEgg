import express from 'express';
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, protectOptional } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protectOptional, createOrder);
router.post('/place', protectOptional, createOrder);
router.get('/my-orders', protect, getUserOrders);
router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);

export default router;
