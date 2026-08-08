import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowRight, Star, Heart, ShoppingCart, Shield, Sparkles, Flame, CheckCircle, Apple, Award } from 'lucide-react';

export const Home = () => {
  const { products, categories, banners, addToCart, toggleWishlist, wishlist } = useContext(AppContext);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState('Porridge');

  // Auto scroll banners
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners]);

  // Seeded Recipes matching image details
  const recipes = {
    Porridge: {
      title: "Nutritious Ragi Porridge (Ambali)",
      description: "A traditional healthy drink rich in iron and calcium, ideal as a morning breakfast or summer coolant.",
      prepTime: "10 mins",
      servings: "2 people",
      ingredients: [
        "3 tbsp The Golden Egg Ragi Flour",
        "2 cups water or butter milk",
        "1/2 cup curd (optional)",
        "Salt to taste",
        "Chopped onions, curry leaves, and green chillies for tempering"
      ],
      instructions: [
        "Mix ragi flour in 1/2 cup of water without any lumps.",
        "Boil the remaining water in a pan, slowly pour the ragi paste while stirring continuously to avoid lumps.",
        "Cook on low flame for 5-7 minutes until the mixture thickens and turns glossy.",
        "Add salt and let it cool completely.",
        "Mix with whisked curd or buttermilk, and garnish with onions and tempering for a cooling traditional drink."
      ]
    },
    Dosas: {
      title: "Crispy Organic Ragi Dosa",
      description: "Crisp and tasty instant breakfast dosas rich in fiber and protein, made with our stone-ground flour.",
      prepTime: "15 mins",
      servings: "3 people",
      ingredients: [
        "1 cup The Golden Egg Ragi Flour",
        "1/2 cup semolina (suji) or rice flour",
        "1/2 cup sour curd",
        "1.5 cups water",
        "Chopped onion, green chillies, ginger, and coriander",
        "1 tsp cumin seeds",
        "Oil for cooking"
      ],
      instructions: [
        "In a large bowl, mix ragi flour, suji/rice flour, curd, cumin, salt, and water into a smooth, thin batter.",
        "Add the chopped onions, ginger, green chillies, and coriander leaves. Let it rest for 10 minutes.",
        "Heat a non-stick tawa. Pour a ladle of batter starting from the edges towards the center (like rava dosa).",
        "Drizzle a teaspoon of oil/ghee around the edges, cook on medium-high heat until the bottom is golden brown and crisp.",
        "Flip and cook the other side for 1 minute. Serve hot with coconut chutney."
      ]
    },
    Cookies: {
      title: "Baked Ragi & Jaggery Cookies",
      description: "Healthy and crunchy oven-baked cookies sweetened with natural jaggery - perfect guilt-free tea snacks.",
      prepTime: "25 mins",
      servings: "10-12 cookies",
      ingredients: [
        "1 cup The Golden Egg Ragi Flour",
        "1/2 cup whole wheat flour",
        "1/2 cup unsalted butter or ghee (melted)",
        "1/2 cup organic jaggery powder",
        "1 tsp baking powder",
        "1 tsp cardamom powder",
        "2-3 tbsp milk (if needed)"
      ],
      instructions: [
        "Preheat your oven to 180°C (350°F) and line a baking tray with parchment paper.",
        "In a bowl, whisk melted ghee and jaggery powder until smooth and creamy.",
        "Sieve ragi flour, wheat flour, baking powder, and cardamom powder into the wet mixture.",
        "Gently mix to form a soft dough. If dry, add 1-2 tablespoons of milk.",
        "Roll into small balls, flatten slightly, and arrange on the tray.",
        "Bake for 12-15 minutes. The cookies will be soft but will turn crispy as they cool."
      ]
    },
    "Ragi ball": {
      title: "Traditional Ragi Ball (Mudde)",
      description: "The classic Karnataka superfood. Extremely rich in calcium and dietary fiber, typically enjoyed with spicy sambar.",
      prepTime: "20 mins",
      servings: "2 balls",
      ingredients: [
        "1 cup The Golden Egg Ragi Flour",
        "2.25 cups water",
        "1 tsp ghee",
        "Salt to taste"
      ],
      instructions: [
        "Boil water in a heavy-bottomed pot. Add salt and ghee.",
        "Mix 1 tablespoon of ragi flour with 2 tablespoons of water to make a thin slurry. Pour into the boiling water.",
        "Once bubbling, add the remaining ragi flour in the center. Do not stir immediately. Cook on medium heat for 3 minutes.",
        "Using a wooden mudde stick (or flat spatula), stir rapidly to incorporate the flour without forming lumps.",
        "Cover and steam-cook on low flame for 5 minutes.",
        "Transfer the hot dough onto a wet plate or clean damp cloth. Apply water to your hands and shape into smooth, round balls. Serve hot with sambar."
      ]
    },
    Roti: {
      title: "Soft Ragi Onion Roti",
      description: "Nutritious flatbreads loaded with onions, green chillies, and fresh coriander. Served with fresh butter.",
      prepTime: "15 mins",
      servings: "4 rotis",
      ingredients: [
        "1.5 cups The Golden Egg Ragi Flour",
        "1 small onion, finely chopped",
        "1-2 green chillies, minced",
        "1/4 cup fresh grated coconut",
        "Chopped coriander and curry leaves",
        "Warm water for kneading",
        "Salt to taste"
      ],
      instructions: [
        "In a mixing bowl, combine ragi flour, onions, chillies, coconut, herbs, and salt.",
        "Gradually add warm water and knead into a soft, pliable dough.",
        "Divide the dough into 4 equal portions.",
        "Spread a damp cloth or butter paper on your counter. Pat a ball of dough using wet fingers into a thin circle.",
        "Gently transfer it onto a hot tawa. Drizzle ghee around it.",
        "Cook on medium heat for 2-3 minutes on each side until fully cooked and slightly crisp. Serve hot."
      ]
    }
  };

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-organic-green-600" />,
      title: "100% Organic & Certified",
      desc: "Milled from finger millets cultivated without chemical pesticides or synthetic fertilizers."
    },
    {
      icon: <Apple className="h-6 w-6 text-organic-green-600" />,
      title: "Rich in Calcium & Iron",
      desc: "Promotes strong bones, teeth, and improves overall hemoglobin levels naturally."
    },
    {
      icon: <Flame className="h-6 w-6 text-organic-green-600" />,
      title: "High Dietary Fiber",
      desc: "Slow-release complex carbohydrates that aid digestion and keep you full longer."
    },
    {
      icon: <Award className="h-6 w-6 text-organic-green-600" />,
      title: "Gluten-Free Superfood",
      desc: "An excellent grain alternative for gluten sensitivities and diabetic-friendly diets."
    }
  ];

  const testimonials = [
    {
      name: "Sujatha Hegde",
      role: "Nutritionist, Bangalore",
      text: "The stone-ground texture of The Golden Egg Ragi flour is unmatched. I recommend it to all my clients looking for authentic, unadulterated finger millet flour.",
      rating: 5
    },
    {
      name: "Karthik Gowda",
      role: "Fitness Coach",
      text: "Ragi mudde is my post-workout meal. The quality of this flour is exceptional. You can clearly feel the difference in taste and energy levels.",
      rating: 5
    },
    {
      name: "Meera Sen",
      role: "Homemaker",
      text: "My kids love the cookies we bake using The Golden Egg ragi flour. It's clean, fresh, and has a very rich aroma.",
      rating: 5
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Carousel Banner */}
      <section className="relative h-[400px] md:h-[550px] overflow-hidden bg-stone-900">
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div
              key={banner._id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Overlay background */}
              <div className="absolute inset-0 bg-black/45 z-20" />
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-10000"
              />
              
              <div className="absolute inset-0 z-30 flex items-center justify-start px-4 sm:px-12 lg:px-24">
                <div className="max-w-xl text-white space-y-6">
                  <span className="bg-organic-gold-500 text-stone-950 text-xs font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider inline-block">
                    Farm Fresh & Certified Organic
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none drop-shadow-md">
                    {banner.title}
                  </h1>
                  <p className="text-base sm:text-lg text-stone-200 font-medium">
                    {banner.subtitle}
                  </p>
                  <div>
                    <Link
                      to={banner.linkUrl || '/products'}
                      className="inline-flex items-center space-x-2 bg-organic-green-700 hover:bg-organic-green-600 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:translate-x-1 shadow-lg shadow-organic-green-950/40"
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white bg-organic-green-900">
            <span className="text-lg">Loading Banners...</span>
          </div>
        )}
      </section>

      {/* 2. Health Benefits Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-organic-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Why Finger Millet?
          </span>
          <h2 className="text-3xl font-black text-stone-900 dark:text-white">
            Natural Organic Nutrition Facts
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mt-3 text-sm sm:text-base">
            Milled from finger millet grains sourced directly from Doddanna Ichahalli Village, Periyapatna, Mysore, ensuring raw organic goodness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="glass-card hover:border-organic-green-700/30 p-6 rounded-2xl flex flex-col space-y-4 hover:shadow-lg group transition-all"
            >
              <div className="h-12 w-12 bg-organic-green-50 dark:bg-organic-green-950/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-organic-green-700 dark:group-hover:text-organic-green-100 transition-colors">
                {b.title}
              </h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Quality & Nutrition Facts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-100/50 dark:bg-stone-900/30 rounded-3xl p-8 sm:p-12 border border-stone-200/40 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Green Nutrition Table - EXACTLY MATCHING IMAGE 2 */}
          <div className="bg-[#5b965c] text-white p-6 sm:p-8 rounded-3xl border border-[#4c7e4d] font-sans shadow-xl max-w-md mx-auto lg:mx-0 w-full">
            <div className="border-b-4 border-white pb-2 mb-4">
              <h3 className="text-3xl font-black uppercase tracking-tight leading-none">Nutrition Facts</h3>
              <p className="text-sm">Serving size: per 100g serving of Ragi Flour</p>
            </div>

            <div className="text-sm space-y-2">
              <div className="flex justify-between border-b border-white/40 pb-1.5 font-bold">
                <span>Dietary Fiber:</span>
                <span>35g (140% DV)</span>
              </div>
              <div className="flex justify-between border-b border-white/40 pb-1.5 font-bold">
                <span>Sugar:</span>
                <span>7.2g</span>
              </div>
              <div className="flex justify-between border-b border-white/40 pb-1.5 font-bold">
                <span>Protein:</span>
                <span>13g (26% DV)</span>
              </div>
              <div className="flex justify-between border-b border-white/40 pb-1.5">
                <span>Vitamin A:</span>
                <span>580%</span>
              </div>
              <div className="flex justify-between border-b border-white/40 pb-1.5">
                <span>Vitamin C:</span>
                <span>1%</span>
              </div>
              <div className="flex justify-between border-b border-white/40 pb-1.5">
                <span>Calcium:</span>
                <span>33%</span>
              </div>
              <div className="flex justify-between pb-1.5 font-bold">
                <span>Iron:</span>
                <span>96%</span>
              </div>
            </div>
          </div>

          {/* Manufacturer & Superfood Quality info */}
          <div className="space-y-6">
            <div>
              <span className="text-organic-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
                Purely Milled
              </span>
              <h3 className="text-3xl font-black text-stone-900 dark:text-white leading-tight">
                Goodness of Superfood
              </h3>
            </div>
            
            <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
              Our 100% Certified Organic Ragi Flour contains no additives, is gluten-free, and is processed at low temperatures to retain its natural dietary fiber, calcium, and iron levels.
            </p>

            <div className="p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/50 dark:border-stone-800 space-y-4">
              <h4 className="font-bold text-sm text-stone-850 dark:text-white">Manufacturer Details</h4>
              <div className="text-xs text-stone-500 dark:text-stone-400 space-y-1">
                <p className="font-bold text-organic-green-800 dark:text-organic-green-400">Processed & MFG BY:</p>
                <p className="text-stone-800 dark:text-stone-200 font-semibold text-sm">The Golden Egg</p>
                <p>Address: Doddanna Ichahalli Village, Gonikoppa Road, Periyapatna</p>
                <p className="font-bold">MYSORE - 571107, Karnataka</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Products - Show pack sizes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <span className="text-organic-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
              Our Packaging Sizes
            </span>
            <h2 className="text-3xl font-black text-stone-900 dark:text-white">
              Select Package Option
            </h2>
          </div>
          <Link
            to="/products"
            className="group flex items-center space-x-1.5 text-organic-green-700 dark:text-organic-green-400 hover:text-organic-green-800 dark:hover:text-organic-green-300 font-bold mt-4 sm:mt-0 transition-colors"
          >
            <span>View Catalog</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p) => {
            const isWish = wishlist.some(item => item._id === p._id);
            return (
              <div
                key={p._id}
                className="glass-card hover:border-organic-green-700/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg group flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative pt-[100%] bg-stone-100 overflow-hidden shrink-0">
                  <Link to={`/products/${p._id}`}>
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Actions overlay */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 h-10 w-10 bg-white/90 dark:bg-stone-900/90 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-500 transition-all shadow-sm"
                  >
                    <Heart className={`h-5 w-5 ${isWish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  {p.stock <= 0 && (
                    <span className="absolute bottom-4 left-4 bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs text-organic-gold-600 dark:text-organic-gold-500 font-extrabold uppercase tracking-wide">
                      {p.category}
                    </span>
                    <Link to={`/products/${p._id}`}>
                      <h3 className="text-base font-bold text-stone-800 dark:text-stone-100 hover:text-organic-green-700 dark:hover:text-organic-green-100 transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(p.averageRating || 0) ? 'fill-amber-400' : 'text-stone-300 dark:text-stone-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-400 font-bold">
                        ({p.reviewsCount || 0})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xl font-extrabold text-stone-900 dark:text-white">
                      ₹{p.price}
                    </span>
                    
                    <button
                      onClick={() => addToCart(p, 1)}
                      disabled={p.stock <= 0}
                      className="bg-organic-green-700 hover:bg-organic-green-800 disabled:bg-stone-300 disabled:dark:bg-stone-800 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-organic-green-700/10"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive Recipes Circle Section */}
      <section id="recipes" className="bg-stone-100 dark:bg-stone-900/50 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-organic-gold-600 font-extrabold text-xs uppercase tracking-widest block">
              One Flour, Infinite Possibilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white">
              Ek Aata, Anek Swad
            </h2>
            <p className="text-stone-650 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              From a single package of <strong>The Golden Egg Certified Organic Ragi Flour</strong>, you can prepare a wide variety of nutritious and delicious dishes. Whether you want to make traditional soft <strong>Roti</strong>, energy-packed <strong>Ragi Balls (Mudde)</strong>, crispy <strong>Dosas</strong>, healthy baked <strong>Cookies</strong>, or warm morning <strong>Porridge</strong>, this versatile stone-ground flour is your perfect kitchen superfood!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Recipes Buttons Column */}
            <div className="flex flex-col space-y-4">
              {Object.keys(recipes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedRecipe(key)}
                  className={`w-full text-left px-6 py-4 rounded-2xl flex items-center justify-between font-bold border transition-all ${
                    selectedRecipe === key
                      ? 'bg-organic-green-700 text-white border-organic-green-700 shadow-md shadow-organic-green-700/20 translate-x-2'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850'
                  }`}
                >
                  <span>{recipes[key].title.split(' ')[1] || key}</span>
                  <CheckCircle className={`h-5 w-5 ${selectedRecipe === key ? 'text-white' : 'text-stone-300 dark:text-stone-700'}`} />
                </button>
              ))}
            </div>

            {/* Recipe Details Card */}
            <div className="lg:col-span-2 bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200/50 dark:border-stone-800 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-xs text-organic-gold-600 dark:text-organic-gold-500 font-bold uppercase tracking-wider">
                  <span className="bg-organic-gold-50 dark:bg-organic-gold-950/40 px-2.5 py-1 rounded-md">
                    Prep Time: {recipes[selectedRecipe].prepTime}
                  </span>
                  <span className="bg-organic-gold-50 dark:bg-organic-gold-950/40 px-2.5 py-1 rounded-md">
                    Servings: {recipes[selectedRecipe].servings}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                  {recipes[selectedRecipe].title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  {recipes[selectedRecipe].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-stone-100 dark:border-stone-800">
                
                {/* Ingredients */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-stone-900 dark:text-white flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-organic-gold-500" />
                    <span>Ingredients</span>
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    {recipes[selectedRecipe].ingredients.map((ing, index) => (
                      <li key={index} className="flex items-start space-x-2 text-stone-600 dark:text-stone-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-organic-green-600 shrink-0 mt-2" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prep instructions */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-stone-900 dark:text-white flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-organic-green-600" />
                    <span>Preparation Method</span>
                  </h4>
                  <ol className="space-y-3.5 text-sm text-stone-600 dark:text-stone-300">
                    {recipes[selectedRecipe].instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="h-5 w-5 rounded-full bg-organic-green-50 dark:bg-organic-green-950/40 text-organic-green-700 dark:text-organic-green-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Brand Heritage & Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-organic-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Our Heritage & Philosophy
          </span>
          <h2 className="text-3xl font-black text-stone-900 dark:text-white">
            The Golden Egg Story
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Brand Intro, Our Story, Our Promise & Closing */}
          <div className="bg-organic-green-900 text-white p-8 sm:p-10 rounded-3xl space-y-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="bg-organic-gold-500 text-stone-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider inline-block mb-3">
                  Brand Introduction
                </span>
                <p className="text-lg font-medium leading-relaxed text-organic-green-100">
                  Welcome to <strong>The Golden Egg</strong>, where we mill the ancient goodness of certified organic superfoods directly from local farms in Mysore.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-extrabold text-organic-gold-500">Our Story</h4>
                <p className="text-sm leading-relaxed text-stone-200">
                  We started in 2024 with a simple realization: mass-produced, heat-treated flours lose their crucial vitamins and dietary fibers. We resolved to make a difference. Sourcing premium grains from Doddanna Ichahalli Village, Periyapatna, we mill at slow speeds using stone grinders to preserve the raw calcium, iron, and mineral content of finger millet.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-extrabold text-organic-gold-500">Our Promise</h4>
                <p className="text-sm leading-relaxed text-stone-200">
                  We promise farm-to-table integrity. No chemical pesticides, no synthetic additives, and no gluten. When you open a green bag of The Golden Egg, you get the absolute rawest, purest, stone-ground millet flour possible.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <h5 className="font-bold text-xs text-organic-gold-500 uppercase tracking-widest">Closing Statement</h5>
              <p className="text-sm font-semibold italic text-stone-100">
                "Great Taste, Great Health. Crafting every meal with love and organic purity. Welcome to a healthier, more energetic life with The Golden Egg."
              </p>
            </div>
          </div>

          {/* Right Column: Mission, Vision, Why Choose Us, & Highlights */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* Mission & Vision Card */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-stone-900 dark:text-white text-base">Our Mission</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    To make chemical-free organic nutrition accessible to every household, supporting traditional growers and offering uncompromised dietary health.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-stone-900 dark:text-white text-base">Our Vision</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    To reinstate nutrient-rich finger millet grains as staple foods globally, promoting active, healthy, and gluten-free lifestyles.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us checklist */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h4 className="font-bold text-stone-900 dark:text-white text-base">Why Choose The Golden Egg?</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-300 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-organic-green-600 shrink-0" />
                  <span>100% Certified Organic Millet</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-organic-green-600 shrink-0" />
                  <span>Milled at Low Temperature</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-organic-green-600 shrink-0" />
                  <span>Supports Mysore Millet Growers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-organic-green-600 shrink-0" />
                  <span>Strict Quality & Purity Checks</span>
                </li>
              </ul>
            </div>

            {/* Product Highlights */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h4 className="font-bold text-stone-900 dark:text-white text-base">Product Highlights</h4>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 bg-stone-50 dark:bg-stone-850 rounded-xl space-y-1">
                  <div className="text-base font-black text-organic-green-800 dark:text-organic-green-400">140%</div>
                  <div className="text-[9px] text-stone-450 uppercase font-bold tracking-wider leading-none">Dietary Fiber</div>
                </div>
                <div className="p-3 bg-stone-50 dark:bg-stone-850 rounded-xl space-y-1">
                  <div className="text-base font-black text-organic-green-800 dark:text-organic-green-400">33%</div>
                  <div className="text-[9px] text-stone-450 uppercase font-bold tracking-wider leading-none">Calcium</div>
                </div>
                <div className="p-3 bg-stone-50 dark:bg-stone-850 rounded-xl space-y-1">
                  <div className="text-base font-black text-organic-green-800 dark:text-organic-green-400">96%</div>
                  <div className="text-[9px] text-stone-450 uppercase font-bold tracking-wider leading-none">Iron Purity</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Testimonial Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-organic-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Reviews
          </span>
          <h2 className="text-3xl font-black text-stone-900 dark:text-white">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-card hover:border-organic-green-700/20 p-8 rounded-3xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-6 border-t border-stone-100 dark:border-stone-850">
                <div className="h-10 w-10 rounded-full bg-organic-green-800 text-white font-bold flex items-center justify-center">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-950 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-stone-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
export default Home;
