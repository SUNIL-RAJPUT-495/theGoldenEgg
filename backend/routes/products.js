import express from 'express';
import { Product, Category, Review } from '../database/models.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// --- Product Endpoints ---

// @desc    Get all products (with search, category, price, and sorting)
// @route   GET /api/products
router.get('/', async (req, res) => {
  const { search, category, minPrice, maxPrice, sortBy } = req.query;

  try {
    let products = await Product.find();

    // 1. Search filter
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Category filter
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // 3. Price range filter
    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    // 4. Sorting
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'rating') {
      products.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    }

    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get a single product details
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create a product (Admin only)
// @route   POST /api/products
router.post('/', protect, admin, async (req, res) => {
  const { name, description, category, price, stock, images, nutritionFacts, ingredients } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      category,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      images: images || [],
      nutritionFacts: nutritionFacts || {},
      ingredients: ingredients || '',
      reviewsCount: 0,
      averageRating: 0
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- Review Endpoints ---

// @desc    Get reviews for a product
// @route   GET /api/products/:id/reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
router.post('/:id/reviews', protect, async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({ productId, userId: req.user._id.toString() });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      productId,
      userId: req.user._id.toString(),
      userName: req.user.name,
      rating: parseInt(rating),
      comment
    });

    // Update product rating summary
    const allReviews = await Review.find({ productId });
    const count = allReviews.length;
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / count;

    await Product.findByIdAndUpdate(productId, {
      reviewsCount: count,
      averageRating: parseFloat(avg.toFixed(1))
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- Category Endpoints ---

// @desc    Get all categories
// @route   GET /api/products/categories/all
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create a category (Admin only)
// @route   POST /api/products/categories
router.post('/categories', protect, admin, async (req, res) => {
  const { name, description, image } = req.body;

  try {
    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = await Category.create({ name, description, image });
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete a category (Admin only)
// @route   DELETE /api/products/categories/:id
router.delete('/categories/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
