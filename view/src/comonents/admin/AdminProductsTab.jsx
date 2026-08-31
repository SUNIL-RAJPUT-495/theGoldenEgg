import React from 'react';
import { Search, Plus, Edit, Trash2, CheckCircle, AlertCircle, X, Check } from 'lucide-react';

export const AdminProductsTab = ({
  productsList,
  searchTerm,
  setSearchTerm,
  stockFilter,
  setStockFilter,
  handleOpenProductModal,
  handleDeleteProduct,
  handleQuickStockUpdate
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Products & Inventory
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Manage product catalog, prices, stock quantities and nutritional specifications
          </p>
        </div>
        <button
          onClick={() => handleOpenProductModal()}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow-lg shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Toolbar: Search & Stock Status Pills */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by product name or weight..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 pl-10 pr-4 py-2 rounded-xl text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#C28E58]"
          />
        </div>

        {/* Stock Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] text-stone-400 font-bold pr-2 shrink-0">Stock:</span>
          {['All', 'Healthy', 'Low', 'Out'].map(st => (
            <button
              key={st}
              onClick={() => setStockFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                stockFilter === st
                  ? 'bg-[#C28E58] text-stone-950 shadow'
                  : 'bg-stone-950 text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {st === 'All' ? 'All Products' : st === 'Out' ? 'Out of Stock' : `${st} Stock`}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory & Stock Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Product Info</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4 text-center">Quick Stock Add</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300">
              {productsList
                .filter(p => {
                  const matchSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      (p.weight || '').toLowerCase().includes(searchTerm.toLowerCase());
                  if (!matchSearch) return false;
                  if (stockFilter === 'Out') return (p.stock || 0) <= 0;
                  if (stockFilter === 'Low') return (p.stock || 0) > 0 && (p.stock || 0) <= 10;
                  if (stockFilter === 'Healthy') return (p.stock || 0) > 10;
                  return true;
                })
                .map(prod => {
                  const pid = prod._id || prod.id;
                  const currStock = Number(prod.stock) || 0;
                  return (
                    <tr key={pid} className="hover:bg-stone-800/40 transition-all">
                      
                      {/* Product Info Column */}
                      <td className="p-4 flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0 p-1">
                          <img
                            src={prod.images?.[0] || '/logo.png'}
                            alt={prod.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{prod.name}</p>
                          <p className="text-[10px] text-[#C28E58] font-bold">{prod.weight || '500g'}</p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-bold text-emerald-400 text-sm">₹{prod.price}</td>

                      {/* Stock Status Badge */}
                      <td className="p-4">
                        {currStock <= 0 ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-950 text-red-300 border border-red-800 inline-flex items-center space-x-1">
                            <X className="h-3 w-3 inline" />
                            <span>Out of Stock</span>
                          </span>
                        ) : currStock <= 10 ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 inline-flex items-center space-x-1">
                            <AlertCircle className="h-3 w-3 inline" />
                            <span>Low Stock</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 inline-flex items-center space-x-1">
                            <Check className="h-3 w-3 inline" />
                            <span>Healthy Stock</span>
                          </span>
                        )}
                      </td>

                      {/* Current Stock */}
                      <td className="p-4">
                        <span className="font-bold text-sm text-white">{currStock} units</span>
                      </td>

                      {/* Quick +5, +10, +50 stock buttons */}
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center space-x-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
                          {[5, 10, 50].map(qty => (
                            <button
                              key={qty}
                              onClick={() => handleQuickStockUpdate(pid, currStock + qty)}
                              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-bold transition-all"
                            >
                              +{qty}
                            </button>
                          ))}
                          <button
                            onClick={() => handleQuickStockUpdate(pid, 0)}
                            className="px-2 py-1 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 text-[10px] font-bold transition-all border border-red-900"
                          >
                            Clear
                          </button>
                        </div>
                      </td>

                      {/* Edit & Delete Action Buttons */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenProductModal(prod)}
                            className="p-2 rounded-xl bg-stone-800 hover:bg-[#C28E58] hover:text-stone-950 text-stone-300 transition-all shadow"
                            title="Edit Product"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(pid)}
                            className="p-2 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white transition-all border border-red-900/40 shadow"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {productsList.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    No products found in inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
