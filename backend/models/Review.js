import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

const MongooseReview = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export const Review = makeWrapper(MongooseReview);
export default Review;
