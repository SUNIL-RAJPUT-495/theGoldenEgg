import { Inquiry } from '../models/index.js';

// Submit Contact Inquiry (Public)
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, subject and message are required' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'New',
      replyNote: ''
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received.',
      inquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
};

// Get All Inquiries (Admin)
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    inquiries.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    res.json({
      success: true,
      count: inquiries.length,
      newCount: inquiries.filter(i => i.status === 'New').length,
      inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries' });
  }
};

// Update Inquiry Status & Reply Note (Admin)
export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, replyNote } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (replyNote !== undefined) updates.replyNote = replyNote;

    const updated = await Inquiry.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, message: 'Inquiry status updated successfully', inquiry: updated });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ success: false, message: 'Failed to update inquiry' });
  }
};

// Delete Inquiry (Admin)
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
  }
};
