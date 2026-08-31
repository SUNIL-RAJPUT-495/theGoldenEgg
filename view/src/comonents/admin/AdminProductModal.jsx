import React from 'react';
import { X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

export const AdminProductModal = ({
  showProductModal,
  setShowProductModal,
  editingProduct,
  productForm,
  setProductForm,
  uploadingImages,
  handleFileUpload,
  handleNutrientChange,
  handleAddNutrientRow,
  handleRemoveNutrientRow,
  handleProductSubmit
}) => {
  if (!showProductModal) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-4 sm:space-y-6 shadow-2xl my-auto max-h-[92vh] flex flex-col animate-scaleUp">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3.5 shrink-0">
          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <p className="text-[11px] text-stone-400">Fill in details, upload pictures and set nutritional facts</p>
          </div>
          <button 
            onClick={() => setShowProductModal(false)} 
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleProductSubmit} className="space-y-4 text-xs overflow-y-auto pr-1 max-h-[70vh] sm:max-h-[74vh]">
          
          {/* Product Name & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="block text-stone-300 font-bold">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Organic Moringa Leaf Powder"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58] text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-stone-300 font-bold">Weight / Pack Size *</label>
              <input
                type="text"
                required
                placeholder="e.g. 500g, 1 kg, 250g, 100g"
                value={productForm.weight}
                onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58] text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="block text-stone-300 font-bold">Price (₹) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 299"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58] text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-stone-300 font-bold">Stock Quantity *</label>
              <input
                type="number"
                required
                placeholder="e.g. 50"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58] text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Multi-Image File Upload */}
          <div className="space-y-2">
            <label className="block text-stone-300 font-bold">
              Product Images (Upload 4-5 Pictures)
            </label>
            
            <div className="border-2 border-dashed border-stone-800 hover:border-[#C28E58] bg-stone-950 p-4 rounded-2xl text-center cursor-pointer transition-all relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-1">
                <ImageIcon className="h-6 w-6 text-[#C28E58] mx-auto" />
                <p className="text-xs font-bold text-white">
                  {uploadingImages ? 'Uploading images via Multer...' : 'Click or Drag & Drop 4-5 Product Pictures'}
                </p>
                <p className="text-[10px] text-stone-400">Supports PNG, JPG, WEBP (Max 5MB per file)</p>
              </div>
            </div>

            {/* Thumbnail Previews */}
            {productForm.images && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2">
                {productForm.images.split(',').map(s => s.trim()).filter(Boolean).map((url, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-stone-700 bg-stone-950 p-1">
                    <img src={url} alt={`Product ${idx + 1}`} className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => {
                        const current = productForm.images.split(',').map(s => s.trim()).filter(Boolean);
                        current.splice(idx, 1);
                        setProductForm({ ...productForm, images: current.join(', ') });
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-950/90 text-red-300 rounded-full opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <details className="text-[11px] text-stone-400">
              <summary className="cursor-pointer font-semibold hover:text-stone-300">Or edit image URLs manually</summary>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={productForm.images}
                onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white mt-1.5 focus:outline-none focus:border-[#C28E58]"
              />
            </details>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-stone-300 font-bold">Description</label>
            <textarea
              rows={2}
              placeholder="Detailed product story and description..."
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58] text-xs sm:text-sm"
            />
          </div>

          {/* Ingredients & Storage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <label className="block text-stone-300 font-bold">Ingredients</label>
              <textarea
                rows={2}
                placeholder="100% Pure Organic Leaf Powder..."
                value={productForm.ingredients}
                onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white focus:outline-none focus:border-[#C28E58] text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-stone-300 font-bold">Storage & Handling</label>
              <textarea
                rows={2}
                placeholder="Store in a cool, dry place away from direct sunlight..."
                value={productForm.storageHandling}
                onChange={(e) => setProductForm({ ...productForm, storageHandling: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white focus:outline-none focus:border-[#C28E58] text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Dynamic Nutrition Facts Section (Responsive Rows) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">Nutrition Facts (Amount per 100g)</h4>
                <p className="text-[10px] text-stone-400">Add or remove custom nutrient rows for this product</p>
              </div>
              <button
                type="button"
                onClick={handleAddNutrientRow}
                className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#C28E58] text-stone-950 font-bold text-[11px] hover:bg-[#b07e4a] transition-all shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Nutrient</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {productForm.nutritionFacts?.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                  <input
                    type="text"
                    placeholder="Nutrient Name (e.g. Energy, Calcium)"
                    value={item.name}
                    onChange={(e) => handleNutrientChange(idx, 'name', e.target.value)}
                    className="w-full sm:flex-1 bg-stone-950 border border-stone-800 px-2.5 py-2 rounded-lg text-white text-xs focus:outline-none focus:border-[#C28E58]"
                  />
                  <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-1">
                    <input
                      type="text"
                      placeholder="Amount (e.g. 205 kcal, 33%)"
                      value={item.amount}
                      onChange={(e) => handleNutrientChange(idx, 'amount', e.target.value)}
                      className="flex-1 bg-stone-950 border border-stone-800 px-2.5 py-2 rounded-lg text-white text-xs focus:outline-none focus:border-[#C28E58]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNutrientRow(idx)}
                      className="p-2 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors shrink-0"
                      title="Delete nutrient row"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {(!productForm.nutritionFacts || productForm.nutritionFacts.length === 0) && (
                <p className="text-center text-[11px] text-stone-500 py-3 italic">
                  No nutrients added yet. Click "+ Add Nutrient" above to create one.
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={() => setShowProductModal(false)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-stone-700 text-stone-300 font-bold text-xs hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs sm:text-sm hover:bg-[#b07e4a] transition-all shadow-lg"
            >
              {editingProduct ? 'Save Product Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
