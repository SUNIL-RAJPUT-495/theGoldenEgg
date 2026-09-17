import bcrypt from 'bcryptjs';
import { User, Order } from '../models/index.js';

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
        status: u.status || 'Active',
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

// Update User Status (Active, Suspended, Blocked) (Admin)
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Suspended', 'Blocked'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Must be Active, Suspended, or Blocked.' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: `User status changed to ${status}`, user: updatedUser });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, message: 'Failed to update user status' });
  }
};

// Update / Change User Password (Admin)
export const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ success: false, message: 'New password must be at least 4 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
      success: true, 
      message: `Password changed successfully for ${updatedUser.name || updatedUser.email}` 
    });
  } catch (error) {
    console.error('Error changing user password:', error);
    res.status(500).json({ success: false, message: 'Failed to change user password' });
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
