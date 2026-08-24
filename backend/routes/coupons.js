import express from 'express';
import { getAllCoupons, validateCoupon, createCoupon, deleteCoupon } from '../controllers/couponController.js';

const router = express.Router();

router.get('/', getAllCoupons);
router.post('/validate', validateCoupon);
router.post('/', createCoupon);
router.delete('/:id', deleteCoupon);

export default router;
