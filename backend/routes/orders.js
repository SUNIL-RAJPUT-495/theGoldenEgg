import express from 'express';
import { Order, Product, Coupon } from '../database/models.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Place a new order
// @route   POST /api/orders/place
router.post('/place', protect, async (req, res) => {
  const { 
    items, 
    shippingAddress, 
    paymentMethod, 
    couponCode,
    totalPrice,
    discount,
    deliveryCharges,
    finalPrice
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No items in order' });
  }

  try {
    // 1. Verify stock and update quantities
    for (const item of items) {
      const dbProduct = await Product.findById(item.productId);
      if (!dbProduct) {
        return res.status(404).json({ success: false, message: `Product ${item.name} not found` });
      }
      if (dbProduct.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for product ${item.name}` });
      }
      
      // Update stock
      await Product.findByIdAndUpdate(item.productId, {
        stock: dbProduct.stock - item.quantity
      });
    }

    // 2. Build tracking timeline
    const timeline = [
      { status: 'Placed', description: 'Order has been placed successfully.', timestamp: new Date() }
    ];

    // 3. Setup payment status based on method
    const paymentStatus = paymentMethod === 'COD' ? 'Pending' : 'Paid'; // Razorpay/UPI simulated as paid instantly

    const order = await Order.create({
      userId: req.user._id.toString(),
      userName: req.user.name,
      items,
      totalPrice,
      couponUsed: couponCode || null,
      discount: discount || 0,
      deliveryCharges: deliveryCharges || 0,
      finalPrice,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      deliveryStatus: 'Placed',
      timeline
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get current user's orders
// @route   GET /api/orders/my-orders

router.get('/my-orders', protect, async (req, res) => {
  try {
    const list = await Order.find({ userId: req.user._id.toString() });
    // Sort by newest first
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, orders: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// @desc    Get order details & tracking status
// @route   GET /api/orders/:id



router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Secure checking
    if (order.userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- Admin Endpoints ---

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
router.get('/', protect, admin, async (req, res) => {
  try {
    const list = await Order.find({});
    // Sort by newest first
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, orders: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update order delivery status (Admin only)
// @route   PUT /api/orders/:id/status
router.put('/:id/status', protect, admin, async (req, res) => {
  const { status, description } = req.body;
  const validStatuses = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid delivery status value' });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Append to timeline
    const updatedTimeline = [...(order.timeline || [])];
    
    // Check if status is already in timeline. If so, update timestamp, otherwise add new
    const idx = updatedTimeline.findIndex(t => t.status === status);
    if (idx !== -1) {
      updatedTimeline[idx] = { status, description: description || `Order is marked as ${status}`, timestamp: new Date() };
    } else {
      updatedTimeline.push({ status, description: description || `Order is marked as ${status}`, timestamp: new Date() });
    }

    const updateFields = {
      deliveryStatus: status,
      timeline: updatedTimeline
    };

    // If marked delivered, update payment status too (for COD orders)
    if (status === 'Delivered') {
      updateFields.paymentStatus = 'Paid';
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
