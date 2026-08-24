import { User, Order } from '../database/models.js';

// Get All Users (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const orders = await Order.find();

    // Map users with total order count & spend summary
    const usersWithStats = users.map(u => {
      const uId = u._id || u.id;
      const userOrders = orders.filter(o => o.userId === uId || o.userName === u.name);
      const totalSpent = userOrders.reduce((sum, o) => sum + (o.finalPrice || 0), 0);
      
      return {
        id: uId,
        _id: uId,
        name: u.name,
        email: u.email,
        phone: u.phone || 'N/A',
        role: u.role || 'customer',
        verified: u.verified ?? true,
        createdAt: u.createdAt || new Date().toISOString(),
        orderCount: userOrders.length,
        totalSpent
      };
    });

    res.json({ success: true, users: usersWithStats });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// Update User Role (Admin)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'customer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User role updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ success: false, message: 'Failed to update user role' });
  }
};

// Delete User (Admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};
