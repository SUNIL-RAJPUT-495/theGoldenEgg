import express from 'express';
import { Coupon } from '../database/models.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Validate a coupon code
// @route   POST /api/coupons/validate
router.post('/validate', async (req, res) => {
  const { code, cartValue } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid coupon code' });
    }

    if (!coupon.active) {
      return res.status(400).json({ success: false, message: 'Coupon is inactive' });
    }

    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
      return res.status(400).json({ success: false, message: 'Coupon has expired' });
    }

    if (cartValue < coupon.minOrderValue) {
      return res.status(400).json({ 
        success: false, 
        message: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon` 
      });
    }

    res.json({
      success: true,
      message: 'Coupon applied successfully!',
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- Admin CRUD ---

// @desc    Get all coupons
// @route   GET /api/coupons
router.get('/', protect, admin, async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create a coupon
// @route   POST /api/coupons
router.post('/', protect, admin, async (req, res) => {
  const { code, discountType, value, minOrderValue, expiryDate, active } = req.body;

  try {
    const exists = await Coupon.findOne({ code: code.toUpperCase() });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      value: parseFloat(value),
      minOrderValue: parseFloat(minOrderValue) || 0,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      active: active !== undefined ? active : true
    });

    res.status(201).json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Toggle coupon status
// @route   PUT /api/coupons/:id
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    res.json({ success: true, coupon: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
