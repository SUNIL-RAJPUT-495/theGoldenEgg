import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

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

const MongooseOrder = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export const Order = makeWrapper(MongooseOrder);
export default Order;
