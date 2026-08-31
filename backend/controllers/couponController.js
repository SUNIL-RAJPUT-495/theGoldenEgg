import { Coupon } from '../models/index.js';

// Get All Coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json({ success: true, coupons });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch coupons' });
  }
};

// Validate Coupon (Customer)
export const validateCoupon = async (req, res) => {
  try {
    const { code, orderValue } = req.body;
    if (!code) return res.status(400).json({ success: false, message: 'Coupon code is required' });

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    }

    if (coupon.minOrderValue && Number(orderValue || 0) < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}`
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (Number(orderValue || 0) * coupon.value) / 100;
    } else {
      discountAmount = coupon.value;
    }

    res.json({
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      value: coupon.value,
      discountAmount: Math.round(discountAmount),
      message: `Coupon ${coupon.code} applied successfully!`
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ success: false, message: 'Failed to validate coupon' });
  }
};

// Create Coupon (Admin)
export const createCoupon = async (req, res) => {
  try {
    const { code, discountType, value, minOrderValue, expiryDate } = req.body;
    if (!code || !value) {
      return res.status(400).json({ success: false, message: 'Code and discount value are required' });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Coupon with this code already exists' });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType: discountType || 'percentage',
      value: Number(value),
      minOrderValue: Number(minOrderValue || 0),
      expiryDate: expiryDate ? new Date(expiryDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      active: true
    });

    res.status(201).json({ success: true, message: 'Coupon created successfully', coupon });
  } catch (error) {
    console.error('Error creating coupon:', error);
    res.status(500).json({ success: false, message: 'Failed to create coupon' });
  }
};

// Delete Coupon (Admin)
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Coupon.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(500).json({ success: false, message: 'Failed to delete coupon' });
  }
};
