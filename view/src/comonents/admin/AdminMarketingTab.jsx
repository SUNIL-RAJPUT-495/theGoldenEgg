import React from 'react';
import { Tag, Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';

export const AdminMarketingTab = ({
  couponsList,
  bannersList,
  showCouponModal,
  setShowCouponModal,
  couponForm,
  setCouponForm,
  handleCreateCoupon,
  handleDeleteCoupon,
  showBannerModal,
  setShowBannerModal,
  bannerForm,
  setBannerForm,
  handleCreateBanner,
  handleDeleteBanner
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Coupons & Hero Banners
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Create promotional discount codes and customize homepage promotional banners
        </p>
      </div>

      {/* Coupons Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
            <Tag className="h-5 w-5 text-[#C28E58]" />
            <span>Discount Coupons ({couponsList.length})</span>
          </h3>
          <button
            onClick={() => setShowCouponModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow"
          >
            <Plus className="h-4 w-4" />
            <span>Create Coupon</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {couponsList.map(c => (
            <div key={c._id || c.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#C28E58]/20 text-[#C28E58] font-mono font-extrabold text-xs uppercase border border-[#C28E58]/40">
                    {c.code}
                  </span>
                  <p className="text-xs text-stone-300 font-bold pt-2">
                    Discount: {c.discountType === 'percentage' ? `${c.value}% OFF` : `₹${c.value} FLAT OFF`}
                  </p>
                  <p className="text-[11px] text-stone-400">Min Order: ₹{c.minOrderValue || 0}</p>
                </div>
                <button 
                  onClick={() => handleDeleteCoupon(c._id || c.id)}
                  className="text-stone-500 hover:text-red-400 p-1 rounded-lg hover:bg-stone-800 transition-all"
                  title="Delete Coupon"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {couponsList.length === 0 && (
            <p className="text-xs text-stone-500 italic py-4 col-span-full">No active coupons created yet.</p>
          )}
        </div>
      </div>

      {/* Banners Section */}
      <div className="space-y-4 pt-6 border-t border-stone-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
            <ImageIcon className="h-5 w-5 text-[#C28E58]" />
            <span>Homepage Hero Banners ({bannersList.length})</span>
          </h3>
          <button
            onClick={() => setShowBannerModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow"
          >
            <Plus className="h-4 w-4" />
            <span>Add Banner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bannersList.map(b => (
            <div key={b._id || b.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="w-full h-36 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 p-1">
                <img src={b.imageUrl} alt={b.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{b.title || 'Banner'}</h4>
                  <p className="text-[10px] text-stone-400">{b.subtitle}</p>
                </div>
                <button 
                  onClick={() => handleDeleteBanner(b._id || b.id)}
                  className="text-stone-500 hover:text-red-400 p-1 rounded-lg hover:bg-stone-800 transition-all"
                  title="Delete Banner"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {bannersList.length === 0 && (
            <p className="text-xs text-stone-500 italic py-4 col-span-full">No hero banners added yet.</p>
          )}
        </div>
      </div>

      {/* MODAL: ADD COUPON */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="text-base font-serif font-bold text-white">Create New Coupon</h3>
              <button onClick={() => setShowCouponModal(false)} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GOLDEN10"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white font-mono uppercase focus:outline-none focus:border-[#C28E58]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Type</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 font-bold mb-1">Value *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 10 or 100"
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Min Order Value (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 499"
                  value={couponForm.minOrderValue}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 font-bold text-xs hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD BANNER */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="text-base font-serif font-bold text-white">Add Homepage Hero Banner</h3>
              <button onClick={() => setShowBannerModal(false)} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBanner} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold mb-1">Banner Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% Certified Organic Superfoods"
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Grown in our Mysore Food Forest"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Banner Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={bannerForm.imageUrl}
                  onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBannerModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 font-bold text-xs hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow"
                >
                  Add Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
