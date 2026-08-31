import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  imageUrl: { type: String, required: true },
  linkUrl: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
export default Banner;
