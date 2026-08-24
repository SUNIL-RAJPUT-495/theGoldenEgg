import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  uploadImages
} from '../controllers/productController.js';
import { uploadProductImages } from '../middleware/upload.js';

const router = express.Router();

// Upload multiple product images (Up to 5 images)
router.post('/upload-images', uploadProductImages.array('images', 5), uploadImages);

// Categories
router.get('/categories/all', getCategories);
router.post('/categories', createCategory);

// Products
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
