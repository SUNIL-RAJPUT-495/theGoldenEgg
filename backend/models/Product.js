import mongoose from 'mongoose';

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
    carbs: { type: String },
    magnesium: { type: String },
    potassium: { type: String },
    sodium: { type: String }
  },
  ingredients: { type: String },
  storageHandling: { type: String },
  reviewsCount: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;
