import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  uploadImages,
  getProductReviews,
  createProductReview
} from '../controllers/productController.js';
import { uploadProductImages } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Upload multiple product images (Up to 5 images)
router.post('/upload-images', uploadProductImages.array('images', 5), uploadImages);

// Categories
router.get('/categories/all', getCategories);
router.post('/categories', createCategory);

// Reviews
router.get('/:id/reviews', getProductReviews);
router.post('/:id/reviews', protect, createProductReview);

// Products
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
