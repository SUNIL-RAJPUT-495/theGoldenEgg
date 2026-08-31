import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
  verifyOtp,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// OTP & Password Management
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Profile Updates
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Address Management Routes
router.get('/addresses', protect, getUserAddresses);
router.post('/addresses', protect, addUserAddress);
router.delete('/addresses/:id', protect, deleteUserAddress);

export default router;
