import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/index.js';
import { getJwtSecret } from '../config/jwtSecret.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({ success: false, message: 'Not authorized, invalid token', invalidToken: true });
      }

      const decoded = jwt.verify(token, getJwtSecret());
      
      let user = null;
      if (decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
        user = await User.findById(decoded.id);
      }
      if (!user && (decoded.id || decoded.email)) {
        user = await User.findOne({
          $or: [
            ...(decoded.id ? [{ _id: decoded.id }, { id: decoded.id }] : []),
            ...(decoded.email ? [{ email: decoded.email }] : [])
          ]
        });
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'User account not found', invalidToken: true });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.warn('Token validation failed:', error.message);
      return res.status(401).json({ success: false, message: 'Session expired or invalid token. Please log in again.', invalidToken: true });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token', invalidToken: true });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as admin' });
  }
};

export const protectOptional = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (token && token !== 'null' && token !== 'undefined') {
        const decoded = jwt.verify(token, getJwtSecret());
        let user = null;
        if (decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
          user = await User.findById(decoded.id);
        }
        if (!user && (decoded.id || decoded.email)) {
          user = await User.findOne({
            $or: [
              ...(decoded.id ? [{ _id: decoded.id }, { id: decoded.id }] : []),
              ...(decoded.email ? [{ email: decoded.email }] : [])
            ]
          });
        }
        if (user) req.user = user;
      }
    } catch (e) {
      // Ignore invalid optional tokens
    }
  }
  return next();
};
