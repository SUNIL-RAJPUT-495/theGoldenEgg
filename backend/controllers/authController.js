import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Address } from '../database/models.js';
import { getJwtSecret } from '../config/jwtSecret.js';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!name || !cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    let existingUser = await User.findOne({ email: cleanEmail });
    if (!existingUser) {
      existingUser = await User.findOne({ 
        email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } 
      });
    }
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: cleanEmail,
      password: hashedPassword,
      phone: phone || '',
      role: 'customer',
      verified: true
    });

    const token = jwt.sign({ id: user._id || user.id, email: user.email, role: user.role }, getJwtSecret(), { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      user = await User.findOne({ 
        email: { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } 
      });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id || user.id, email: user.email, role: user.role }, getJwtSecret(), { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Get Current Logged-in User Profile
export const getMe = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      success: true,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    res.status(500).json({ success: false, message: 'Server error fetching user details' });
  }
};

// --- User Address Handlers ---
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const addresses = await Address.find({ userId });
    res.json({ success: true, count: addresses.length, addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch addresses' });
  }
};

export const addUserAddress = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { name, phone, address, city, state, pincode, isDefault } = req.body;
    if (!name || !phone || !address || !city || !state || !pincode) {
      return res.status(400).json({ success: false, message: 'All address fields are required' });
    }

    if (isDefault) {
      const existing = await Address.find({ userId });
      for (const addr of existing) {
        if (addr.isDefault) {
          await Address.findByIdAndUpdate(addr._id || addr.id, { isDefault: false });
        }
      }
    }

    const newAddress = await Address.create({
      userId,
      name,
      phone,
      address,
      city,
      state,
      pincode,
      isDefault: Boolean(isDefault)
    });

    res.status(201).json({ success: true, message: 'Address saved successfully', address: newAddress });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ success: false, message: 'Failed to save address' });
  }
};

export const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.json({ success: true, message: 'Address removed successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ success: false, message: 'Failed to delete address' });
  }
};
