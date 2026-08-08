import express from 'express';
import { Banner } from '../database/models.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all active banners
// @route   GET /api/banners
router.get('/', async (req, res) => {
  try {
    const list = await Banner.find({ active: true });
    res.json({ success: true, banners: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- Admin CRUD ---

// @desc    Get all banners
// @route   GET /api/banners/all
router.get('/all', protect, admin, async (req, res) => {
  try {
    const list = await Banner.find({});
    res.json({ success: true, banners: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create banner
// @route   POST /api/banners
router.post('/', protect, admin, async (req, res) => {
  const { title, subtitle, imageUrl, linkUrl, active } = req.body;

  try {
    const banner = await Banner.create({
      title,
      subtitle,
      imageUrl,
      linkUrl: linkUrl || '/',
      active: active !== undefined ? active : true
    });
    res.status(201).json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update banner
// @route   PUT /api/banners/:id
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, banner: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete banner
// @route   DELETE /api/banners/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
