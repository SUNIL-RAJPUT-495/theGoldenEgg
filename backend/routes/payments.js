import express from 'express';
import { getAllPayments, createPaymentLog, updatePaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', getAllPayments);
router.post('/', createPaymentLog);
router.put('/:id/status', updatePaymentStatus);

export default router;
