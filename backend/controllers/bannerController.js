import { Banner } from '../database/models.js';

// Get All Banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json({ success: true, banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch banners' });
  }
};

// Create Banner (Admin)
export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, imageUrl, linkUrl, active } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    const banner = await Banner.create({
      title: title || '',
      subtitle: subtitle || '',
      imageUrl,
      linkUrl: linkUrl || '/products',
      active: active !== undefined ? active : true
    });

    res.status(201).json({ success: true, message: 'Banner created successfully', banner });
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ success: false, message: 'Failed to create banner' });
  }
};

// Toggle / Update Banner (Admin)
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Banner.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, message: 'Banner updated successfully', banner: updated });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ success: false, message: 'Failed to update banner' });
  }
};

// Delete Banner (Admin)
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Banner.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ success: false, message: 'Failed to delete banner' });
  }
};
