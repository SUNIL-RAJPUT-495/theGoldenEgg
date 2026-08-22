import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { Product, Category, Coupon, Banner, User } from './database/models.js';

// Route Imports
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import couponRoutes from './routes/coupons.js';
import bannerRoutes from './routes/banners.js';
import analyticsRoutes from './routes/analytics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'The Golden Egg E-Commerce API is running...' });
});

// Seed Initial Data function
const seedInitialData = async () => {
  try {
    // 1. Seed admin and demo customer if none exist
    const adminUser = await User.findOne({ email: 'admin@thegoldenegg.com' });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const adminPassword = await bcrypt.hash('admin123', salt);
      const customerPassword = await bcrypt.hash('customer123', salt);

      await User.create({
        name: 'The Golden Egg Admin',
        email: 'admin@thegoldenegg.com',
        password: adminPassword,
        role: 'admin',
        phone: '9876543210',
        verified: true
      });

      await User.create({
        name: 'Ramesh Kumar',
        email: 'customer@thegoldenegg.com',
        password: customerPassword,
        role: 'customer',
        phone: '9876543211',
        verified: true
      });

      console.log('🌱 Seeded Demo Users: admin@thegoldenegg.com / admin123, customer@thegoldenegg.com / customer123');
    }

    // 2. Seed Categories
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount === 0) {
      await Category.create({
        name: 'Organic Flours',
        description: 'Nutritious stone-ground flours loaded with health benefits.',
        image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=400&q=80'
      });
      await Category.create({
        name: 'Culinary Foundations',
        description: 'Rich, umami-packed and sun-dried dehydrated essential powders.',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'
      });
      await Category.create({
        name: 'Botanical Apothecary',
        description: 'Sustainably harvested botanical powders for everyday wellness rituals.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
      });
      console.log('🌱 Seeded Categories (Organic Flours, Culinary Foundations, Botanical Apothecary).');
    }

    // 3. Seed Banners
    const bannersCount = await Banner.countDocuments();
    if (bannersCount === 0) {
      await Banner.create({
        title: 'Rooted in Nature. Grown with Compassion.',
        subtitle: '100% Certified Organic Ragi Flour & Annapurna Collection',
        imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
        linkUrl: '/products',
        active: true
      });
      await Banner.create({
        title: 'The Annapurna Collection: Nature, Preserved',
        subtitle: 'Freeze-dried culinary & botanical powders with 2+ years shelf life',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80',
        linkUrl: '/products',
        active: true
      });
      console.log('🌱 Seeded Home Banners.');
    }

    // 4. Seed Coupons
    const couponsCount = await Coupon.countDocuments();
    if (couponsCount === 0) {
      await Coupon.create({
        code: 'WELCOME10',
        discountType: 'percentage',
        value: 10,
        minOrderValue: 200,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        active: true
      });
      await Coupon.create({
        code: 'SUPERFOOD',
        discountType: 'flat',
        value: 100,
        minOrderValue: 500,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        active: true
      });
      console.log('🌱 Seeded Coupons (WELCOME10, SUPERFOOD).');
    }

    // 5. Seed Products
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      // Product 1: Ragi Flour 5KG
      await Product.create({
        name: 'Organic Ragi Flour (5KG)',
        description: 'Made from carefully selected organic finger millet grains, our ragi is cleaned and processed before being milled into a convenient flour for everyday cooking. Rich in calcium, protein, dietary fibre and minerals. Grown in our 4-acre Mysore food forest.',
        category: 'Organic Flours',
        price: 450,
        stock: 60,
        images: [
          'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          dietaryFiber: '35g (140% DV)',
          sugar: '7.2g',
          protein: '13g (26% DV)',
          vitaminA: '580%',
          vitaminC: '1%',
          calcium: '33%',
          iron: '96%'
        },
        ingredients: '100% Organically Grown Finger Millet (Ragi) Flour. Chemical-free.',
        reviewsCount: 12,
        averageRating: 4.9
      });

      // Product 2: Ragi Flour 2KG
      await Product.create({
        name: 'Organic Ragi Flour (2KG)',
        description: 'Made from organically grown ragi, reflecting our commitment to working with nature. Suited to traditional Indian preparations as well as contemporary recipes like porridges, rotis, dosas, pancakes, and bakes.',
        category: 'Organic Flours',
        price: 190,
        stock: 80,
        images: [
          'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          dietaryFiber: '35g (140% DV)',
          sugar: '7.2g',
          protein: '13g (26% DV)',
          vitaminA: '580%',
          vitaminC: '1%',
          calcium: '33%',
          iron: '96%'
        },
        ingredients: '100% Organically Grown Finger Millet (Ragi) Flour.',
        reviewsCount: 8,
        averageRating: 4.8
      });

      // Product 3: Ragi Flour 1KG
      await Product.create({
        name: 'Organic Ragi Flour (1KG)',
        description: 'Naturally gluten-free organic finger millet flour. Cleaned, milled, and packed for convenient everyday use in the home kitchen.',
        category: 'Organic Flours',
        price: 99,
        stock: 120,
        images: [
          'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          dietaryFiber: '35g (140% DV)',
          sugar: '7.2g',
          protein: '13g (26% DV)',
          vitaminA: '580%',
          vitaminC: '1%',
          calcium: '33%',
          iron: '96%'
        },
        ingredients: '100% Organically Grown Finger Millet (Ragi) Flour.',
        reviewsCount: 15,
        averageRating: 4.9
      });

      // Product 4: Turmeric Powder
      await Product.create({
        name: 'Annapurna Collection - Turmeric Powder (200g)',
        description: 'Deeply golden, high-curcumin roots harvested from our food forest. Advanced freeze-drying preservation ensures over 2 years of shelf life without synthetic additives.',
        category: 'Culinary Foundations',
        price: 249,
        stock: 50,
        images: [
          'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          curcumin: 'High Curcumin (5.5%+)',
          preservatives: '0% Synthetic Additives',
          shelfLife: '2+ Years'
        },
        ingredients: '100% Pure High-Curcumin Turmeric Root Powder.',
        reviewsCount: 6,
        averageRating: 5.0
      });

      // Product 5: Garlic & Onion Powder
      await Product.create({
        name: 'Annapurna Collection - Garlic & Onion Powder (150g)',
        description: 'Rich, umami-packed aromatics dehydrated from natural forest produce. Pure, potent, and pantry-ready essential for soups, curries, and gravies.',
        category: 'Culinary Foundations',
        price: 279,
        stock: 40,
        images: [
          'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          shelfLife: '2+ Years',
          additives: 'None'
        },
        ingredients: 'Dehydrated Organic Garlic & Onion Powder.',
        reviewsCount: 4,
        averageRating: 4.7
      });

      // Product 6: Ginger & Pepper Powder
      await Product.create({
        name: 'Annapurna Collection - Ginger & Pepper Powder (150g)',
        description: 'Potent heat, sun-dried for maximum potency. Blended from heritage Malnad ginger and Coorg black pepper roots.',
        category: 'Culinary Foundations',
        price: 299,
        stock: 35,
        images: [
          'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          shelfLife: '2+ Years',
          additives: 'None'
        },
        ingredients: 'Sun-dried Organic Ginger & Black Pepper Powder.',
        reviewsCount: 5,
        averageRating: 4.9
      });

      // Product 7: Tomato & Carrot Powder
      await Product.create({
        name: 'Annapurna Collection - Tomato & Carrot Powder (200g)',
        description: 'Concentrated ingredients for soups, stews and smoothies. Preserves natural vitamins, color, and rich flavor naturally.',
        category: 'Culinary Foundations',
        price: 269,
        stock: 45,
        images: [
          'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          shelfLife: '2+ Years',
          additives: 'None'
        },
        ingredients: 'Dehydrated Tomato & Carrot Powder.',
        reviewsCount: 3,
        averageRating: 4.8
      });

      // Product 8: Beetroot Powder
      await Product.create({
        name: 'Annapurna Collection - Beetroot Powder (200g)',
        description: 'A vibrant addition to everyday recipes, baking, porridges, and drinks. Loaded with natural antioxidants.',
        category: 'Culinary Foundations',
        price: 259,
        stock: 55,
        images: [
          'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          shelfLife: '2+ Years',
          additives: 'None'
        },
        ingredients: '100% Dehydrated Organic Beetroot Powder.',
        reviewsCount: 7,
        averageRating: 4.9
      });

      // Product 9: Tulsi Powder
      await Product.create({
        name: 'Apothecary Series - Tulsi (Holy Basil) Powder (100g)',
        description: 'A traditional botanical for everyday wellness rituals. Handpicked Holy Basil leaves from our food forest, shade-dried and finely ground.',
        category: 'Botanical Apothecary',
        price: 219,
        stock: 60,
        images: [
          'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          shelfLife: '2+ Years',
          additives: 'None'
        },
        ingredients: '100% Organic Tulsi (Holy Basil) Leaf Powder.',
        reviewsCount: 9,
        averageRating: 5.0
      });

      // Product 10: Rose Powder
      await Product.create({
        name: 'Apothecary Series - Rose Powder (100g)',
        description: 'Sustainably harvested petals for culinary infusion and skincare. Pure, aromatic, and free from synthetic fragrances or preservatives.',
        category: 'Botanical Apothecary',
        price: 249,
        stock: 40,
        images: [
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
        ],
        nutritionFacts: {
          shelfLife: '2+ Years',
          additives: 'None'
        },
        ingredients: '100% Organically Grown Rose Petal Powder.',
        reviewsCount: 11,
        averageRating: 4.9
      });

      console.log('🌱 Seeded Organic Ragi Packs & Annapurna Collection Products.');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  seedInitialData().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  });
});
