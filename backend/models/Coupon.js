import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, default: 'percentage' }, // percentage, flat
  value: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  expiryDate: { type: Date },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
export default Coupon;
