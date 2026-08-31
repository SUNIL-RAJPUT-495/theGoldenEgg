import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New' }, // New, In Progress, Resolved
  replyNote: { type: String }
}, { timestamps: true });

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
export default Inquiry;
