import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  getUserAddresses,
  addUserAddress,
  deleteUserAddress
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Address Management Routes
router.get('/addresses', protect, getUserAddresses);
router.post('/addresses', protect, addUserAddress);
router.delete('/addresses/:id', protect, deleteUserAddress);

export default router;
