import express from 'express';
import { Order, User, Product } from '../database/models.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get admin statistics
// @route   GET /api/analytics
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    const users = await User.find({ role: 'customer' });
    const products = await Product.find({});

    // Calculations
    const totalSales = orders.reduce((sum, order) => {
      // Exclude cancelled or pending unpaid orders if desired, but sum all valid orders for simplicity
      return sum + order.finalPrice;
    }, 0);

    const totalOrders = orders.length;
    const totalUsers = users.length;
    const outOfStockProducts = products.filter(p => p.stock <= 0).length;

    // Delivery status breakdown
    const statusCounts = {
      Placed: 0,
      Packed: 0,
      Shipped: 0,
      'Out for Delivery': 0,
      Delivered: 0
    };

    orders.forEach(order => {
      if (statusCounts[order.deliveryStatus] !== undefined) {
        statusCounts[order.deliveryStatus]++;
      }
    });

    // Recent orders (last 5)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const recentOrders = orders.slice(0, 5);

    res.json({
      success: true,
      stats: {
        totalSales: parseFloat(totalSales.toFixed(2)),
        totalOrders,
        totalUsers,
        outOfStockProducts,
        statusCounts,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
