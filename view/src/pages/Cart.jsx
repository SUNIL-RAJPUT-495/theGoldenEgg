import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Trash2, Plus, Minus, Tag, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    applyCoupon, 
    appliedCoupon, 
    setAppliedCoupon,
    getCartTotals 
  } = useContext(AppContext);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const totals = getCartTotals();

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    try {
      const data = await applyCoupon(couponCode);
      if (data.success) {
        setCouponSuccess(`Coupon "${data.coupon.code}" applied!`);
        setCouponCode('');
      }
    } catch (err) {
      setCouponError(err.message || 'Failed to apply coupon');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
        <div className="h-20 w-20 bg-organic-green-50 dark:bg-organic-green-950/40 rounded-full flex items-center justify-center mx-auto text-organic-green-700 dark:text-organic-green-300">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white">Your cart is empty</h3>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            Looks like you haven't added any organic items to your cart yet.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-organic-green-700 hover:bg-organic-green-600 text-white font-bold px-8 py-3 rounded-full transition-all"
        >
          <span>Browse Products</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-stone-900 dark:text-white mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left column: Cart Items list */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="glass-card p-5 rounded-2xl flex items-center justify-between gap-6"
            >
              {/* Product Thumbnail */}
              <div className="h-20 w-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/50">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>

              {/* Info & Quantity controls */}
              <div className="flex-grow min-w-0 space-y-1">
                <h3 className="font-bold text-stone-850 dark:text-white text-base truncate">
                  {item.name}
                </h3>
                <div className="text-stone-500 text-sm font-semibold">
                  ₹{item.price}
                </div>
                
                {/* Mobile controls inside info block */}
                <div className="flex sm:hidden items-center space-x-2 pt-2">
                  <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-full px-2 py-0.5 bg-white dark:bg-stone-900 text-xs">
                    <button onClick={() => updateCartQty(item.productId, item.quantity - 1)} className="p-0.5">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQty(item.productId, item.quantity + 1)} className="p-0.5">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Desktop controls */}
              <div className="hidden sm:flex items-center space-x-6">
                <div className="flex items-center border border-stone-250 dark:border-stone-800 rounded-full px-3 py-1 bg-white dark:bg-stone-900">
                  <button onClick={() => updateCartQty(item.productId, item.quantity - 1)} className="p-1 text-stone-500">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-4 font-bold text-sm w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateCartQty(item.productId, item.quantity + 1)} className="p-1 text-stone-500">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="text-base font-extrabold text-stone-900 dark:text-white w-20 text-right">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 text-stone-400 hover:text-red-500 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all"
                  title="Remove Item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Right column: Coupon & Summary */}
        <div className="space-y-8">
          
          {/* Coupon Code section */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-base text-stone-900 dark:text-white flex items-center space-x-2">
              <Tag className="h-5 w-5 text-organic-gold-500" />
              <span>Apply Discount Coupon</span>
            </h3>

            {couponSuccess && (
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-950/25 border border-green-200 dark:border-green-800 px-4 py-2 rounded-xl text-sm text-green-700 dark:text-green-300">
                <span className="font-bold">{couponSuccess}</span>
                <button onClick={handleRemoveCoupon} className="hover:text-red-500 text-xs font-bold underline pl-2">
                  Remove
                </button>
              </div>
            )}

            {couponError && (
              <p className="text-xs text-red-500 font-bold flex items-center space-x-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{couponError}</span>
              </p>
            )}

            {!appliedCoupon && (
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="WELCOME10 or SUPERFOOD"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow bg-stone-50 dark:bg-stone-900 p-2.5 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none text-sm text-stone-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-stone-800 dark:bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Cart Summary Totals */}
          <div className="glass-card p-6 rounded-3xl space-y-6">
            <h3 className="font-bold text-lg text-stone-900 dark:text-white border-b border-stone-150 dark:border-stone-850 pb-4">
              Order Summary
            </h3>

            <div className="space-y-3.5 text-sm text-stone-500 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-800 dark:text-white">₹{totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  <span className="font-semibold">-₹{totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                {totals.deliveryCharges === 0 ? (
                  <span className="text-green-600 dark:text-green-400 font-semibold uppercase text-xs mt-0.5">Free</span>
                ) : (
                  <span className="font-semibold text-stone-800 dark:text-white">₹{totals.deliveryCharges.toFixed(2)}</span>
                )}
              </div>

              {totals.deliveryCharges > 0 && (
                <p className="text-[10px] text-stone-400 italic">
                  * Shop for ₹{(500 - totals.subtotal).toFixed(2)} more to unlock Free Delivery!
                </p>
              )}
            </div>

            <div className="border-t border-stone-150 dark:border-stone-850 pt-4 flex justify-between items-center">
              <span className="font-bold text-stone-800 dark:text-white">Total Price:</span>
              <span className="text-2xl font-black text-organic-green-800 dark:text-organic-green-400">
                ₹{totals.finalTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold py-3 rounded-full shadow-lg shadow-organic-green-700/20 transition-all hover:scale-[1.01] flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
export default Cart;
