import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { Star, Heart, ShoppingCart, Plus, Minus, Check, AlertTriangle } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, products, API_URL } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('nutrition'); // nutrition, description, ingredients, reviews
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  
  // Review form state
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [reviewError, setReviewError] = useState('');

  // Fetch product detail
  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      if (data.success) {
        setProduct(data.product);
        setSelectedImage(data.product.images?.[0] || '');
      }
      
      // Fetch reviews
      const reviewsRes = await axios.get(`${API_URL}/products/${id}/reviews`);
      if (reviewsRes.data.success) {
        setReviews(reviewsRes.data.reviews);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    setQty(1);
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSuccess('');
    setReviewError('');
    try {
      const { data } = await axios.post(`${API_URL}/products/${id}/reviews`, {
        rating: userRating,
        comment: userComment
      });
      if (data.success) {
        setReviewSuccess('Thank you! Your review has been submitted.');
        setUserComment('');
        fetchProductDetail(); // Reload reviews & new averages
      }
    } catch (error) {
      setReviewError(error.response?.data?.message || 'Login to write a review');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, qty);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-organic-green-700 mx-auto" />
        <p className="text-stone-500 text-sm">Fetching organic details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertTriangle className="h-10 w-10 text-red-500 mx-auto" />
        <h3 className="text-xl font-bold">Product not found</h3>
        <button onClick={() => navigate('/products')} className="bg-organic-green-700 text-white px-6 py-2 rounded-full">
          Back to Shop
        </button>
      </div>
    );
  }

  const isWish = wishlist.some(item => item._id === product._id);
  const related = products.filter(p => p.category === product.category && p._id !== product._id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Main Grid: Product Gallery + Basic Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="relative pt-[90%] bg-stone-100 rounded-3xl border border-stone-200/50 overflow-hidden group">
            <img
              src={selectedImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
            />
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 bg-stone-100 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImage === img ? 'border-organic-green-700 scale-95 shadow-md' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info details */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs text-organic-gold-600 dark:text-organic-gold-500 font-extrabold uppercase tracking-widest bg-organic-gold-50 dark:bg-organic-gold-950/40 px-3 py-1 rounded-full inline-block">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white leading-none">
              {product.name}
            </h1>

            {/* Ratings & Reviews summary */}
            <div className="flex items-center space-x-2.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.averageRating || 0) ? 'fill-amber-400' : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                {product.averageRating || '0.0'}
              </span>
              <span className="text-xs text-stone-400 font-bold border-l pl-2.5 dark:border-stone-800">
                {product.reviewsCount || 0} reviews
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-extrabold text-organic-green-800 dark:text-organic-green-400">
              ₹{product.price}
            </div>

            {/* Basic specifications */}
            <div className="flex items-center space-x-4">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center space-x-1.5 ${
                product.stock > 0
                  ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300'
                  : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
              }`}>
                <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-green-600' : 'bg-red-650'}`} />
                <span>{product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}</span>
              </span>
            </div>

            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
              {product.description?.substring(0, 180)}...
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-stone-200/50 dark:border-stone-800">
            {/* Quantity Adjuster */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-stone-600 dark:text-stone-300">Quantity:</span>
                <div className="flex items-center border border-stone-250 dark:border-stone-800 rounded-full px-3 py-1 bg-white dark:bg-stone-900">
                  <button onClick={() => setQty(prev => Math.max(1, prev - 1))} className="p-1 text-stone-500">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-bold text-sm w-10 text-center">{qty}</span>
                  <button onClick={() => setQty(prev => Math.min(product.stock, prev + 1))} className="p-1 text-stone-500">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product, qty)}
                disabled={product.stock <= 0}
                className="flex-1 bg-white hover:bg-stone-50 dark:bg-stone-900 border border-organic-green-700 text-organic-green-700 py-3 rounded-full font-bold transition-all hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex-1 bg-organic-green-700 hover:bg-organic-green-800 text-white py-3 rounded-full font-bold transition-all hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-md shadow-organic-green-700/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Buy Now</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-full border transition-all ${
                  isWish
                    ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-950/20'
                    : 'border-stone-200 hover:bg-stone-50 dark:border-stone-800 text-stone-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWish ? 'fill-red-500' : ''}`} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Detailed Tabs Component */}
      <section className="glass-card rounded-3xl overflow-hidden p-6 sm:p-8">
        
        {/* Tabs Headers */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 overflow-x-auto pb-1 space-x-6 sm:space-x-10 text-sm sm:text-base">
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`pb-4 font-bold transition-all shrink-0 relative ${
              activeTab === 'nutrition' ? 'text-organic-green-700 dark:text-organic-green-400 font-extrabold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Nutrition Facts
            {activeTab === 'nutrition' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-organic-green-700" />}
          </button>
          
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 font-bold transition-all shrink-0 relative ${
              activeTab === 'description' ? 'text-organic-green-700 dark:text-organic-green-400 font-extrabold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Description
            {activeTab === 'description' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-organic-green-700" />}
          </button>

          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-4 font-bold transition-all shrink-0 relative ${
              activeTab === 'ingredients' ? 'text-organic-green-700 dark:text-organic-green-400 font-extrabold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Ingredients
            {activeTab === 'ingredients' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-organic-green-700" />}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-bold transition-all shrink-0 relative ${
              activeTab === 'reviews' ? 'text-organic-green-700 dark:text-organic-green-400 font-extrabold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Reviews ({reviews.length})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-organic-green-700" />}
          </button>
        </div>

        {/* Tabs Content */}
        <div className="pt-8 min-h-[220px]">
          
          {/* A. Nutrition Facts - EXACTLY MATCHING IMAGE 2 layout */}
          {activeTab === 'nutrition' && (
            <div className="max-w-md bg-[#5b965c] text-white p-5 rounded-2xl border border-[#4c7e4d] font-sans">
              <div className="border-b-4 border-white pb-1.5 mb-2.5">
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none">Nutrition Facts</h3>
                <p className="text-xs">Serving size: per 100g serving</p>
              </div>

              <div className="text-xs space-y-1.5">
                <div className="flex justify-between border-b border-white/40 pb-1 font-bold">
                  <span>Dietary Fiber:</span>
                  <span>{product.nutritionFacts?.dietaryFiber || '7g'}</span>
                </div>
                <div className="flex justify-between border-b border-white/40 pb-1 font-bold">
                  <span>Sugar:</span>
                  <span>{product.nutritionFacts?.sugar || '1.4g'}</span>
                </div>
                <div className="flex justify-between border-b border-white/40 pb-1 font-bold">
                  <span>Protein:</span>
                  <span>{product.nutritionFacts?.protein || '2.6g'}</span>
                </div>
                <div className="flex justify-between border-b border-white/40 pb-1">
                  <span>Vitamin A:</span>
                  <span>{product.nutritionFacts?.vitaminA || '116%'}</span>
                </div>
                <div className="flex justify-between border-b border-white/40 pb-1">
                  <span>Vitamin C:</span>
                  <span>{product.nutritionFacts?.vitaminC || '0%'}</span>
                </div>
                <div className="flex justify-between border-b border-white/40 pb-1">
                  <span>Calcium:</span>
                  <span>{product.nutritionFacts?.calcium || '6.6%'}</span>
                </div>
                <div className="flex justify-between pb-1 font-bold">
                  <span>Iron:</span>
                  <span>{product.nutritionFacts?.iron || '19.2%'}</span>
                </div>
              </div>
            </div>
          )}

          {/* B. Full Description */}
          {activeTab === 'description' && (
            <div className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed space-y-4 max-w-4xl">
              <p>{product.description}</p>
            </div>
          )}

          {/* C. Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed max-w-3xl space-y-4">
              <div className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-850 rounded-2xl">
                <p className="font-bold text-stone-800 dark:text-white mb-2">Ingredients List:</p>
                <p>{product.ingredients || "100% Certified Organic Millet Flour. Free from wheat, gluten, artificial colors, and preservatives."}</p>
              </div>
            </div>
          )}

          {/* D. Reviews & Rating Form */}
          {activeTab === 'reviews' && (
            <div className="space-y-10 max-w-4xl">
              
              {/* Form to submit review */}
              <div className="p-6 bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-850 rounded-2xl space-y-4">
                <h4 className="font-bold text-base text-stone-900 dark:text-white">Write a Customer Review</h4>
                
                {reviewSuccess && <p className="text-sm text-green-600 font-bold">{reviewSuccess}</p>}
                {reviewError && <p className="text-sm text-red-500 font-bold">{reviewError}</p>}

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-stone-500">Rating:</span>
                    <div className="flex space-x-1 text-stone-300">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setUserRating(starVal)}
                          className={`p-0.5 hover:scale-110 transition-transform ${
                            starVal <= userRating ? 'text-amber-400' : ''
                          }`}
                        >
                          <Star className={`h-5 w-5 ${starVal <= userRating ? 'fill-amber-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Share your thoughts about this product's quality, packaging, and delivery..."
                      rows={3}
                      required
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className="w-full bg-white dark:bg-stone-950 p-3.5 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-organic-green-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-organic-green-700 hover:bg-organic-green-800 text-white font-semibold text-xs px-6 py-2.5 rounded-full"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Review Lists */}
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <div key={rev._id} className="border-b border-stone-100 dark:border-stone-850 pb-6 space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-sm text-stone-900 dark:text-white">{rev.userName}</h5>
                        <span className="text-xs text-stone-400 font-medium">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-stone-400 text-sm italic py-4">
                    No reviews for this product yet. Be the first to share your experience!
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </section>

      {/* 3. Related Products */}
      {related.length > 0 && (
        <section className="space-y-8">
          <h3 className="text-2xl font-black text-stone-900 dark:text-white">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => {
              const isWishRelated = wishlist.some(item => item._id === p._id);
              return (
                <div
                  key={p._id}
                  className="glass-card hover:border-organic-green-700/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg group flex flex-col h-full"
                >
                  <div className="relative pt-[100%] bg-stone-100 overflow-hidden shrink-0">
                    <button
                      onClick={() => navigate(`/products/${p._id}`)}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={p.images?.[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                    <button
                      onClick={() => toggleWishlist(p)}
                      className="absolute top-4 right-4 h-10 w-10 bg-white/90 dark:bg-stone-900/90 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 text-stone-500 dark:text-stone-400 hover:text-red-500 transition-all shadow-sm z-10"
                    >
                      <Heart className={`h-5 w-5 ${isWishRelated ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-xs text-organic-gold-600 dark:text-organic-gold-500 font-extrabold uppercase">
                        {p.category}
                      </span>
                      <h4
                        onClick={() => navigate(`/products/${p._id}`)}
                        className="text-sm font-bold text-stone-800 dark:text-stone-100 hover:text-organic-green-700 cursor-pointer transition-colors line-clamp-1"
                      >
                        {p.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-base font-extrabold text-stone-900 dark:text-white">
                        ₹{p.price}
                      </span>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="bg-organic-green-700 hover:bg-organic-green-800 text-white p-2 rounded-xl"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};
export default ProductDetails;
