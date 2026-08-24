import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

const BannerSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  imageUrl: { type: String, required: true },
  linkUrl: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const MongooseBanner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

export const Banner = makeWrapper(MongooseBanner);
export default Banner;
