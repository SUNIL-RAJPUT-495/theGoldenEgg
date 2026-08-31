import { Payment, Order } from '../models/index.js';

// Get All Payment Logs (Admin)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    payments.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    // Summary calculation
    const totalProcessed = payments.reduce((sum, p) => p.paymentStatus === 'Paid' ? sum + (p.amount || 0) : sum, 0);
    const pendingAmount = payments.reduce((sum, p) => p.paymentStatus === 'Pending' ? sum + (p.amount || 0) : sum, 0);
    
    res.json({
      success: true,
      count: payments.length,
      summary: {
        totalProcessed,
        pendingAmount,
        totalTransactions: payments.length
      },
      payments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch payments' });
  }
};

// Create / Log New Payment
export const createPaymentLog = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, paymentStatus, transactionId, notes } = req.body;
    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Missing orderId, amount or paymentMethod' });
    }

    const userId = req.user?.id || 'guest';
    const userName = req.user?.name || 'Customer';

    const newPayment = await Payment.create({
      orderId,
      userId,
      userName,
      amount: Number(amount),
      paymentMethod,
      paymentStatus: paymentStatus || 'Pending',
      transactionId: transactionId || `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      notes: notes || ''
    });

    res.status(201).json({ success: true, payment: newPayment });
  } catch (error) {
    console.error('Error creating payment log:', error);
    res.status(500).json({ success: false, message: 'Failed to record payment' });
  }
};

// Update Payment Status (Admin / Gateway Webhook)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, transactionId } = req.body;

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    const updates = { paymentStatus };
    if (transactionId) updates.transactionId = transactionId;

    const updatedPayment = await Payment.findByIdAndUpdate(id, updates, { new: true });

    // Also update order status if linked
    if (payment.orderId) {
      const order = await Order.findById(payment.orderId);
      if (order) {
        await Order.findByIdAndUpdate(payment.orderId, { paymentStatus });
      }
    }

    res.json({ success: true, message: 'Payment status updated successfully', payment: updatedPayment });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ success: false, message: 'Failed to update payment status' });
  }
};
