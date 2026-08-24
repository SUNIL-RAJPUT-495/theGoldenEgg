import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

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

const MongooseUser = mongoose.models.User || mongoose.model('User', UserSchema);

export const User = makeWrapper(MongooseUser);
export default User;
