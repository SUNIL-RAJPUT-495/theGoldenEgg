import { Order, Product, User, Inquiry, Payment } from '../models/index.js';

// Get Dashboard Analytics (Admin)
export const getAnalyticsStats = async (req, res) => {
  try {
    const orders = await Order.find();
    const products = await Product.find();
    const users = await User.find();
    const inquiries = await Inquiry.find();
    const payments = await Payment.find();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.finalPrice || 0), 0);
    const totalProducts = products.length;
    const totalCustomers = users.filter(u => u.role === 'customer').length || users.length;
    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter(i => i.status === 'New').length;
    const totalPayments = payments.length;

    // Delivery Status Breakdown
    const ordersByStatus = {
      Placed: orders.filter(o => o.deliveryStatus === 'Placed').length,
      Packed: orders.filter(o => o.deliveryStatus === 'Packed').length,
      Shipped: orders.filter(o => o.deliveryStatus === 'Shipped').length,
      OutForDelivery: orders.filter(o => o.deliveryStatus === 'Out for Delivery').length,
      Delivered: orders.filter(o => o.deliveryStatus === 'Delivered').length
    };

    // Payment Method Breakdown
    const paymentsByMethod = {
      COD: orders.filter(o => o.paymentMethod === 'COD').length,
      Razorpay: orders.filter(o => o.paymentMethod === 'Razorpay').length,
      UPI: orders.filter(o => o.paymentMethod === 'UPI').length
    };

    // Stock Alerts (Low stock < 50)
    const lowStockProducts = products.filter(p => (p.stock || 0) < 50);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        totalProducts,
        totalCustomers,
        totalInquiries,
        newInquiries,
        totalPayments,
        ordersByStatus,
        paymentsByMethod,
        lowStockCount: lowStockProducts.length
      }
    });
  } catch (error) {
    console.error('Error calculating analytics:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate dashboard statistics' });
  }
};
