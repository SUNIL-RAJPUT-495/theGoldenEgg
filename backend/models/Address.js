import mongoose from 'mongoose';
import { makeWrapper } from '../database/wrapper.js';

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

const MongooseAddress = mongoose.models.Address || mongoose.model('Address', AddressSchema);

export const Address = makeWrapper(MongooseAddress);
export default Address;
