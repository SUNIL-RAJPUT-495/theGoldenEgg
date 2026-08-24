import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String }
}, { timestamps: true });

const MongooseCategory = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export const Category = makeWrapper(MongooseCategory);
export default Category;
