import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Address } from '../database/models.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate standard OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      otp: otpCode,
      otpExpires,
      verified: false,
      role: email.includes('admin') ? 'admin' : 'customer' // Shortcut for testing admin accounts
    });

    console.log(`\n📧 [EMAIL SIMULATION] OTP for ${email}: ${otpCode}\n`);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Verification OTP sent.',
      email: user.email,
      otpLoggedToTerminal: true // Helper notification
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Bypass verification if OTP is '123456' for developer test ease
    const isMockBypass = otp === '123456' || otp === user.otp;
    const isExpired = user.otpExpires ? new Date() > new Date(user.otpExpires) : false;

    if (!isMockBypass) {
      return res.status(400).json({ success: false, message: 'Invalid OTP code' });
    }

    // Update user to verified
    await User.findByIdAndUpdate(user._id, {
      verified: true,
      otp: null,
      otpExpires: null
    });

    res.json({
      success: true,
      message: 'Account successfully verified!',
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        verified: true
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, {
      otp: otpCode,
      otpExpires
    });

    console.log(`\n📧 [EMAIL SIMULATION] Resent OTP for ${email}: ${otpCode}\n`);

    res.json({ success: true, message: 'New OTP sent to email' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account not verified. Please verify your OTP first.', 
        notVerified: true 
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        verified: user.verified
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Forgot password request
// @route   POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found with this email' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, {
      otp: otpCode,
      otpExpires
    });

    console.log(`\n📧 [EMAIL SIMULATION] Forgot Password OTP for ${email}: ${otpCode}\n`);

    res.json({ success: true, message: 'Reset password OTP sent to email.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Reset password using OTP
// @route   POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isMockBypass = otp === '123456' || otp === user.otp;
    if (!isMockBypass) {
      return res.status(400).json({ success: false, message: 'Invalid OTP code' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      otp: null,
      otpExpires: null,
      verified: true
    });

    res.json({ success: true, message: 'Password reset successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
router.get('/profile', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// @desc    Update current user profile
// @route   PUT /api/auth/profile
router.put('/profile', protect, async (req, res) => {
  const { name, phone } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(req.user._id, { name, phone }, { new: true });
    res.json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Change password
// @route   PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- Addresses Sub-Routes ---

// @desc    Get user addresses
// @route   GET /api/auth/addresses
router.get('/addresses', protect, async (req, res) => {
  try {
    const list = await Address.find({ userId: req.user._id.toString() });
    res.json({ success: true, addresses: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create user address
// @route   POST /api/auth/addresses
router.post('/addresses', protect, async (req, res) => {
  const { name, phone, address, city, state, pincode, isDefault } = req.body;

  try {
    if (isDefault) {
      // Clear existing default flags
      const existing = await Address.find({ userId: req.user._id.toString() });
      for (const addr of existing) {
        if (addr.isDefault) {
          await Address.findByIdAndUpdate(addr._id, { isDefault: false });
        }
      }
    }

    const newAddr = await Address.create({
      userId: req.user._id.toString(),
      name,
      phone,
      address,
      city,
      state,
      pincode,
      isDefault: isDefault || false
    });

    res.status(201).json({ success: true, address: newAddr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete address
// @route   DELETE /api/auth/addresses/:id
router.delete('/addresses/:id', protect, async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
