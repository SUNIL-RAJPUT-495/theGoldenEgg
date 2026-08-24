import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Star, Heart, ShoppingCart, SlidersHorizontal, Search, RefreshCw, X } from 'lucide-react';

export const Products = () => {
  const { products, categories, fetchProducts, addToCart, toggleWishlist, wishlist } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(parseInt(searchParams.get('maxPrice')) || 1000);
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');
  const [searchVal, setSearchVal] = useState(searchParams.get('search') || '');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setCategoryFilter(searchParams.get('category') || '');
    setSearchVal(searchParams.get('search') || '');
  }, [searchParams]);

  // Trigger API calls on filters change
  const applyFilters = () => {
    const filters = {};
    if (searchVal) filters.search = searchVal;
    if (categoryFilter) filters.category = categoryFilter;
    if (priceRange < 1000) filters.maxPrice = priceRange;
    if (sortBy) filters.sortBy = sortBy;

    fetchProducts(filters);

    // Update URL Params
    const newParams = {};
    if (searchVal) newParams.search = searchVal;
    if (categoryFilter) newParams.category = categoryFilter;
    if (priceRange < 1000) newParams.maxPrice = priceRange;
    if (sortBy) newParams.sortBy = sortBy;
    setSearchParams(newParams);
  };

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, priceRange, sortBy, searchVal]);

  const handleReset = () => {
    setCategoryFilter('');
    setPriceRange(1000);
    setSortBy('newest');
    setSearchVal('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Search Result Title */}
      {(searchVal || categoryFilter) && (
        <div className="mb-8 flex items-center space-x-2 text-sm text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 px-4 py-2.5 rounded-xl inline-flex">
          <span>Active Filter:</span>
          {searchVal && <span className="font-bold text-stone-800 dark:text-stone-100">Search "{searchVal}"</span>}
          {categoryFilter && <span className="font-bold text-stone-800 dark:text-stone-100">Category "{categoryFilter}"</span>}
          <button onClick={handleReset} className="hover:text-red-500 transition-colors pl-2 border-l border-stone-300 dark:border-stone-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
          <div className="glass-card p-6 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-150 dark:border-stone-800 pb-4">
              <h3 className="font-bold text-lg text-stone-900 dark:text-white flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4 text-organic-green-600" />
                <span>Filters</span>
              </h3>
              <button
                onClick={handleReset}
                className="text-xs text-stone-400 hover:text-organic-green-700 font-bold transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-stone-700 dark:text-stone-300">Category</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setCategoryFilter('')}
                  className={`w-full text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors font-medium ${
                    categoryFilter === ''
                      ? 'bg-organic-green-50 dark:bg-organic-green-950/40 text-organic-green-700 dark:text-organic-green-300 font-bold'
                      : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setCategoryFilter(cat.name)}
                    className={`w-full text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors font-medium ${
                      categoryFilter === cat.name
                        ? 'bg-organic-green-50 dark:bg-organic-green-950/40 text-organic-green-700 dark:text-organic-green-300 font-bold'
                        : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right side Products list */}
        <section className="flex-grow">
          {/* Header controls for mobile / counts */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm text-stone-500 font-bold">
              Showing {products.length} organic products
            </span>
            
            <div className="flex space-x-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden flex items-center space-x-1.5 bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 text-stone-600 dark:text-stone-300 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-stone-55 transition-all"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Product grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => {
                const isWish = wishlist.some(item => item._id === p._id);
                return (
                  <div
                    key={p._id}
                    className="glass-card hover:border-organic-green-700/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg group flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative pt-[100%] bg-stone-100 overflow-hidden shrink-0">
                      <Link to={`/products/${p._id}`}>
                        <img
                          src={p.images?.[0]}
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      
                      {/* Actions */}
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="absolute top-4 right-4 h-10 w-10 bg-white/90 dark:bg-stone-900/90 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-500 transition-all shadow-sm z-10"
                      >
                        <Heart className={`h-5 w-5 ${isWish ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      {p.stock <= 0 && (
                        <span className="absolute bottom-4 left-4 bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md z-10">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs text-organic-gold-600 dark:text-organic-gold-500 font-extrabold uppercase tracking-wide">
                          {p.category}
                        </span>
                        <Link to={`/products/${p._id}`}>
                          <h3 className="text-base font-bold text-stone-800 dark:text-stone-100 hover:text-organic-green-700 dark:hover:text-organic-green-100 transition-colors line-clamp-2">
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
                          className="bg-organic-green-700 hover:bg-organic-green-800 disabled:bg-stone-200 disabled:dark:bg-stone-800 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-organic-green-700/10"
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
          ) : (
            <div className="text-center py-24 glass-card rounded-3xl max-w-lg mx-auto space-y-4">
              <span className="text-4xl">🌾</span>
              <h3 className="font-bold text-lg text-stone-850 dark:text-white">No products found</h3>
              <p className="text-stone-500 text-sm">
                No organic items matched your exact filters. Try relaxing your parameters.
              </p>
              <button
                onClick={handleReset}
                className="bg-organic-green-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

      </div>

      {/* Mobile Drawer Filter Dialog */}
      {showFiltersMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Overlay */}
          <div onClick={() => setShowFiltersMobile(false)} className="absolute inset-0 bg-black/50" />
          
          {/* Drawer container */}
          <div className="relative w-80 max-w-xs h-full bg-white dark:bg-stone-950 p-6 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-lg flex items-center space-x-2">
                  <SlidersHorizontal className="h-4 w-4 text-organic-green-600" />
                  <span>Filters</span>
                </h3>
                <button onClick={() => setShowFiltersMobile(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-stone-700 dark:text-stone-300">Category</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setCategoryFilter('')}
                    className={`w-full text-left text-sm py-1.5 px-2.5 rounded-lg ${
                      categoryFilter === '' ? 'bg-organic-green-50 text-organic-green-700 font-bold' : ''
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => setCategoryFilter(cat.name)}
                      className={`w-full text-left text-sm py-1.5 px-2.5 rounded-lg ${
                        categoryFilter === cat.name ? 'bg-organic-green-50 text-organic-green-700 font-bold' : ''
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-6 border-t flex space-x-3">
              <button
                onClick={handleReset}
                className="w-1/2 border py-2.5 rounded-full text-sm font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="w-1/2 bg-organic-green-700 text-white py-2.5 rounded-full text-sm font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default Products;
