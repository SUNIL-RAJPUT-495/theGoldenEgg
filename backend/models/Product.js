import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  nutritionFacts: {
    calories: { type: String },
    dietaryFiber: { type: String },
    sugar: { type: String },
    protein: { type: String },
    vitaminA: { type: String },
    vitaminC: { type: String },
    calcium: { type: String },
    iron: { type: String },
    fat: { type: String },
    carbs: { type: String }
  },
  ingredients: { type: String },
  storageHandling: { type: String },
  reviewsCount: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

const MongooseProduct = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export const Product = makeWrapper(MongooseProduct);
export default Product;
