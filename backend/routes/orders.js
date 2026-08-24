import express from 'express';
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/my-orders', protect, getUserOrders);
router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);

export default router;
