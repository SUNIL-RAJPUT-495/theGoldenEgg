import mongoose from 'mongoose';
import { isLocalDb } from '../config/db.js';
import { localDb } from './localDb.js';

// --- Mongoose Schemas ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' }, // customer, admin
  phone: { type: String },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date }
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  nutritionFacts: {
    dietaryFiber: { type: String },
    sugar: { type: String },
    protein: { type: String },
    vitaminA: { type: String },
    vitaminC: { type: String },
    calcium: { type: String },
    iron: { type: String }
  },
  ingredients: { type: String },
  reviewsCount: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String }
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  items: [{
    productId: { type: String, required: true },
    name: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String }
  }],
  totalPrice: { type: Number, required: true },
  couponUsed: { type: String },
  discount: { type: Number, default: 0 },
  deliveryCharges: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },
  shippingAddress: {
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  paymentMethod: { type: String, default: 'COD' }, // COD, Razorpay, UPI
  paymentStatus: { type: String, default: 'Pending' }, // Pending, Paid
  deliveryStatus: { type: String, default: 'Placed' }, // Placed, Packed, Shipped, Out for Delivery, Delivered
  timeline: [{
    status: { type: String },
    timestamp: { type: Date, default: Date.now },
    description: { type: String }
  }]
}, { timestamps: true });

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, default: 'percentage' }, // percentage, flat
  value: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  expiryDate: { type: Date },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

const BannerSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  imageUrl: { type: String, required: true },
  linkUrl: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const AddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

// --- Compile Mongoose Models ---
const MongooseUser = mongoose.models.User || mongoose.model('User', UserSchema);
const MongooseProduct = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const MongooseCategory = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const MongooseOrder = mongoose.models.Order || mongoose.model('Order', OrderSchema);
const MongooseCoupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
const MongooseReview = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
const MongooseBanner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
const MongooseAddress = mongoose.models.Address || mongoose.model('Address', AddressSchema);

// --- Create Interface Wrappers ---
const makeWrapper = (mongooseModel, localCollection) => {
  return {
    find: async (filter = {}) => {
      if (isLocalDb()) return await localCollection.find(filter);
      return await mongooseModel.find(filter).lean();
    },
    findOne: async (filter = {}) => {
      if (isLocalDb()) return await localCollection.findOne(filter);
      return await mongooseModel.findOne(filter).lean();
    },
    findById: async (id) => {
      if (isLocalDb()) return await localCollection.findById(id);
      return await mongooseModel.findById(id).lean();
    },
    create: async (data) => {
      if (isLocalDb()) return await localCollection.create(data);
      const instance = new mongooseModel(data);
      const saved = await instance.save();
      return saved.toObject();
    },
    findByIdAndUpdate: async (id, updateData, options = { new: true }) => {
      if (isLocalDb()) return await localCollection.findByIdAndUpdate(id, updateData, options);
      return await mongooseModel.findByIdAndUpdate(id, updateData, { ...options, lean: true });
    },
    findByIdAndDelete: async (id) => {
      if (isLocalDb()) return await localCollection.findByIdAndDelete(id);
      return await mongooseModel.findByIdAndDelete(id).lean();
    },
    countDocuments: async (filter = {}) => {
      if (isLocalDb()) return await localCollection.countDocuments(filter);
      return await mongooseModel.countDocuments(filter);
    }
  };
};

export const User = makeWrapper(MongooseUser, localDb.Users);
export const Product = makeWrapper(MongooseProduct, localDb.Products);
export const Category = makeWrapper(MongooseCategory, localDb.Categories);
export const Order = makeWrapper(MongooseOrder, localDb.Orders);
export const Coupon = makeWrapper(MongooseCoupon, localDb.Coupons);
export const Review = makeWrapper(MongooseReview, localDb.Reviews);
export const Banner = makeWrapper(MongooseBanner, localDb.Banners);
export const Address = makeWrapper(MongooseAddress, localDb.Addresses);
