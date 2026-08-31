import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String },
  userName: { type: String },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // COD, Razorpay, UPI, Card
  paymentStatus: { type: String, default: 'Pending' }, // Pending, Paid, Failed
  transactionId: { type: String },
  notes: { type: String }
}, { timestamps: true });

export const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
export default Payment;
