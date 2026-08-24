import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, default: 'percentage' }, // percentage, flat
  value: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  expiryDate: { type: Date },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const MongooseCoupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

export const Coupon = makeWrapper(MongooseCoupon);
export default Coupon;
