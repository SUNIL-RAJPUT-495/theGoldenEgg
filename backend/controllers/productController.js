import { Product, Category, Review } from '../models/index.js';

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let products = await Product.find();

    if (category) {
      products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        p.name?.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

// Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product details' });
  }
};

// Create Product (Admin)
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, category, description, images, ingredients, nutritionFacts } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, message: 'Name and price are required' });
    }

    const product = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock || 0),
      category: category || 'Organic Flours',
      description: description || '',
      images: Array.isArray(images) ? images : (images ? [images] : []),
      ingredients: ingredients || '',
      storageHandling: req.body.storageHandling || '',
      nutritionFacts: nutritionFacts || {}
    });

    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

// Update Product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.price !== undefined) updateData.price = Number(updateData.price);
    if (updateData.stock !== undefined) updateData.stock = Number(updateData.stock);

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product updated successfully', product: updated });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

// Delete Product (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

// --- Categories ---
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });

    const category = await Category.create({ name, description: description || '', image: image || '' });
    res.status(201).json({ success: true, message: 'Category created successfully', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

// Upload Product Images (Multer)
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files uploaded' });
    }

    const host = req.protocol + '://' + req.get('host');
    const imageUrls = req.files.map(file => `${host}/uploads/${file.filename}`);

    res.json({
      success: true,
      message: `${req.files.length} image(s) uploaded successfully`,
      imageUrls
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ success: false, message: 'Failed to process image uploads' });
  }
};

// --- Reviews ---
export const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ productId: id });
    res.json({ success: true, reviews: Array.isArray(reviews) ? reviews.reverse() : [] });
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};

export const createProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?._id || req.user?.id;
    const userName = req.user?.name || 'Verified Customer';

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const review = await Review.create({
      productId: id,
      userId,
      userName,
      rating: Number(rating),
      comment: comment || ''
    });

    const allReviews = await Review.find({ productId: id });
    const reviewsCount = allReviews.length;
    const avg = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewsCount;

    await Product.findByIdAndUpdate(id, {
      reviewsCount,
      averageRating: Math.round(avg * 10) / 10
    });

    res.status(201).json({ success: true, message: 'Review added successfully', review });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
};
