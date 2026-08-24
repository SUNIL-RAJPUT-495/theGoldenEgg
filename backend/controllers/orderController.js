import { Order, Product, Payment } from '../database/models.js';

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, discount, deliveryCharges, finalPrice, shippingAddress, paymentMethod, couponUsed } = req.body;

    if (!items || !items.length || !finalPrice || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Invalid order details provided' });
    }

    const userId = req.user?.id || 'guest_user';
    const userName = shippingAddress.name || 'Valued Customer';

    const order = await Order.create({
      userId,
      userName,
      items,
      totalPrice: Number(totalPrice),
      discount: Number(discount || 0),
      deliveryCharges: Number(deliveryCharges || 0),
      finalPrice: Number(finalPrice),
      shippingAddress,
      couponUsed: couponUsed || null,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'Razorpay' || paymentMethod === 'UPI' ? 'Paid' : 'Pending',
      deliveryStatus: 'Placed',
      timeline: [
        { status: 'Placed', description: 'Order placed successfully', timestamp: new Date() }
      ]
    });

    const orderIdStr = order._id || order.id;

    // Log corresponding Payment transaction
    await Payment.create({
      orderId: orderIdStr,
      userId,
      userName,
      amount: Number(finalPrice),
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'Razorpay' || paymentMethod === 'UPI' ? 'Paid' : 'Pending',
      transactionId: `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    });

    // Update Product Stock
    for (const item of items) {
      try {
        const prod = await Product.findById(item.productId);
        if (prod && prod.stock >= item.quantity) {
          await Product.findByIdAndUpdate(item.productId, { stock: prod.stock - item.quantity });
        }
      } catch (err) {
        console.error(`Failed to update stock for product ${item.productId}:`, err);
      }
    }

    res.status(201).json({ success: true, message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const orders = await Order.find({ userId });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user orders' });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    // Sort most recent first
    orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus, paymentStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const updates = {};
    const timeline = order.timeline || [];

    if (deliveryStatus && deliveryStatus !== order.deliveryStatus) {
      updates.deliveryStatus = deliveryStatus;
      timeline.push({
        status: deliveryStatus,
        description: `Order delivery status updated to ${deliveryStatus}`,
        timestamp: new Date()
      });
      updates.timeline = timeline;
    }

    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
      
      // Also update related Payment record if present
      const orderIdStr = order._id || order.id;
      const paymentRecord = await Payment.findOne({ orderId: orderIdStr });
      if (paymentRecord) {
        const payId = paymentRecord._id || paymentRecord.id;
        await Payment.findByIdAndUpdate(payId, { paymentStatus });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};
