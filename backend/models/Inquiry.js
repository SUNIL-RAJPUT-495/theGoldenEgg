import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New' }, // New, In Progress, Resolved
  replyNote: { type: String }
}, { timestamps: true });

const MongooseInquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

export const Inquiry = makeWrapper(MongooseInquiry);
export default Inquiry;
