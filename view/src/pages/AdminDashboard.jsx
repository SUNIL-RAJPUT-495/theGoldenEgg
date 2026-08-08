import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { 
  BarChart3, Plus, Edit, Trash2, Tag, Calendar, CheckSquare, 
  ShoppingBag, Check, ShieldAlert, AlertCircle, RefreshCw, X 
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  // Tabs: analytics, products, orders, coupons, categories
  const [activeTab, setActiveTab] = useState('analytics');

  // API Data
  const [stats, setStats] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [couponsList, setCouponsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null if adding
  const [productForm, setProductForm] = useState({
    name: '', price: '', stock: '', category: '', description: '',
    images: '', ingredients: '',
    dietaryFiber: '', sugar: '', protein: '', vitaminA: '', vitaminC: '', calcium: '', iron: ''
  });

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '', discountType: 'percentage', value: '', minOrderValue: '', expiryDate: ''
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '', description: '', image: ''
  });

  // Verify Admin role
  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      // Allow a brief delay or let verification handle it
    } else {
      fetchAdminData();
    }
  }, [token, user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Fetch Stats
      const statsRes = await axios.get('http://localhost:5000/api/analytics');
      if (statsRes.data.success) setStats(statsRes.data.stats);

      // Fetch Products
      const prodRes = await axios.get('http://localhost:5000/api/products');
      if (prodRes.data.success) setProductsList(prodRes.data.products);

      // Fetch Orders
      const orderRes = await axios.get('http://localhost:5000/api/orders');
      if (orderRes.data.success) setOrdersList(orderRes.data.orders);

      // Fetch Coupons
      const couponRes = await axios.get('http://localhost:5000/api/coupons');
      if (couponRes.data.success) setCouponsList(couponRes.data.coupons);

      // Fetch Categories
      const catRes = await axios.get('http://localhost:5000/api/products/categories/all');
      if (catRes.data.success) setCategoriesList(catRes.data.categories);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin details:', error);
      setLoading(false);
    }
  };

  // --- Products CRUD ---
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      category: productForm.category,
      description: productForm.description,
      images: productForm.images ? productForm.images.split(',').map(s => s.trim()) : [],
      ingredients: productForm.ingredients,
      nutritionFacts: {
        dietaryFiber: productForm.dietaryFiber,
        sugar: productForm.sugar,
        protein: productForm.protein,
        vitaminA: productForm.vitaminA,
        vitaminC: productForm.vitaminC,
        calcium: productForm.calcium,
        iron: productForm.iron
      }
    };

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/products', payload);
      }
      setShowProductModal(false);
      setEditingProduct(null);
      fetchAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing product');
    }
  };

  const handleEditProductClick = (p) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name || '',
      price: p.price || '',
      stock: p.stock || '',
      category: p.category || '',
      description: p.description || '',
      images: p.images?.join(', ') || '',
      ingredients: p.ingredients || '',
      dietaryFiber: p.nutritionFacts?.dietaryFiber || '',
      sugar: p.nutritionFacts?.sugar || '',
      protein: p.nutritionFacts?.protein || '',
      vitaminA: p.nutritionFacts?.vitaminA || '',
      vitaminC: p.nutritionFacts?.vitaminC || '',
      calcium: p.nutritionFacts?.calcium || '',
      iron: p.nutritionFacts?.iron || ''
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (pid) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${pid}`);
        fetchAdminData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- Orders Management ---
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus,
        description: `Order has been marked as ${newStatus} by admin.`
      });
      fetchAdminData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // --- Coupons CRUD ---
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/coupons', couponForm);
      setShowCouponModal(false);
      setCouponForm({ code: '', discountType: 'percentage', value: '', minOrderValue: '', expiryDate: '' });
      fetchAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Coupon error');
    }
  };

  const handleDeleteCoupon = async (cid) => {
    if (window.confirm('Delete coupon?')) {
      try {
        await axios.delete(`http://localhost:5000/api/coupons/${cid}`);
        fetchAdminData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- Categories CRUD ---
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products/categories', categoryForm);
      setShowCategoryModal(false);
      setCategoryForm({ name: '', description: '', image: '' });
      fetchAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Category error');
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (window.confirm('Delete category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/categories/${catId}`);
        fetchAdminData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!token || user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-6 px-4">
        <div className="h-16 w-16 bg-red-50 text-red-650 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-stone-900">Admin Authorization Required</h3>
          <p className="text-sm text-stone-500">
            This dashboard console is restricted to administrators of The Golden Egg.
          </p>
        </div>
        <button
          onClick={() => navigate('/auth')}
          className="bg-stone-850 hover:bg-stone-900 text-white font-semibold text-xs px-6 py-2.5 rounded-full"
        >
          Sign In as Admin
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b">
        <div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-white leading-none">Admin Console</h1>
          <p className="text-xs text-stone-400 font-semibold mt-1">Configure products, process orders, and review analytics stats.</p>
        </div>
        
        <button
          onClick={fetchAdminData}
          className="flex items-center space-x-1.5 border border-stone-200 dark:border-stone-800 text-stone-500 text-xs font-semibold px-4 py-2 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-50"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Console</span>
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex border-b space-x-8 text-sm overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 font-bold border-b-2 transition-all shrink-0 ${
            activeTab === 'analytics' ? 'text-organic-green-700 border-organic-green-700 font-extrabold' : 'text-stone-400 border-transparent hover:text-stone-650'
          }`}
        >
          Overview & Stats
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-4 font-bold border-b-2 transition-all shrink-0 ${
            activeTab === 'products' ? 'text-organic-green-700 border-organic-green-700 font-extrabold' : 'text-stone-400 border-transparent hover:text-stone-650'
          }`}
        >
          Product Catalog ({productsList.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 font-bold border-b-2 transition-all shrink-0 ${
            activeTab === 'orders' ? 'text-organic-green-700 border-organic-green-700 font-extrabold' : 'text-stone-400 border-transparent hover:text-stone-650'
          }`}
        >
          Orders Tracker ({ordersList.length})
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-4 font-bold border-b-2 transition-all shrink-0 ${
            activeTab === 'coupons' ? 'text-organic-green-700 border-organic-green-700 font-extrabold' : 'text-stone-400 border-transparent hover:text-stone-650'
          }`}
        >
          Discount Coupons ({couponsList.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-4 font-bold border-b-2 transition-all shrink-0 ${
            activeTab === 'categories' ? 'text-organic-green-700 border-organic-green-700 font-extrabold' : 'text-stone-400 border-transparent hover:text-stone-650'
          }`}
        >
          Categories ({categoriesList.length})
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-organic-green-700 mx-auto" />
          <p className="text-stone-400 text-xs">Syncing store records...</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* TAB 1: ANALYTICS OVERVIEW */}
          {activeTab === 'analytics' && stats && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Summary stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="glass-card p-6 rounded-3xl flex flex-col justify-between h-32">
                  <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Total Sales Earnings</div>
                  <div className="text-3xl font-black text-stone-850 dark:text-white">₹{stats.totalSales}</div>
                  <div className="text-[10px] text-green-600 font-bold">Updated live</div>
                </div>

                <div className="glass-card p-6 rounded-3xl flex flex-col justify-between h-32">
                  <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Total Orders placed</div>
                  <div className="text-3xl font-black text-stone-850 dark:text-white">{stats.totalOrders}</div>
                  <div className="text-[10px] text-stone-400">Including cash & online</div>
                </div>

                <div className="glass-card p-6 rounded-3xl flex flex-col justify-between h-32">
                  <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Registered Clients</div>
                  <div className="text-3xl font-black text-stone-850 dark:text-white">{stats.totalUsers}</div>
                  <div className="text-[10px] text-stone-400">Excluding admin accounts</div>
                </div>

                <div className="glass-card p-6 rounded-3xl flex flex-col justify-between h-32">
                  <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">Stock Alerts (Out of Stock)</div>
                  <div className="text-3xl font-black text-stone-850 dark:text-white">{stats.outOfStockProducts}</div>
                  <div className={`text-[10px] font-bold ${stats.outOfStockProducts > 0 ? 'text-red-500' : 'text-green-600'}`}>
                    {stats.outOfStockProducts > 0 ? 'Needs restock' : 'Inventory healthy'}
                  </div>
                </div>

              </div>

              {/* Status counts and recent orders */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: status volumes */}
                <div className="glass-card p-6 rounded-3xl space-y-4">
                  <h3 className="font-bold text-base text-stone-900">Delivery Status Volume</h3>
                  <div className="space-y-3.5 text-sm">
                    {Object.entries(stats.statusCounts || {}).map(([status, val]) => (
                      <div key={status} className="flex justify-between items-center">
                        <span className="text-stone-500 font-medium">{status}</span>
                        <span className="font-bold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-250 px-2.5 py-1 rounded-md text-xs">
                          {val} orders
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: recent orders */}
                <div className="lg:col-span-2 glass-card p-6 rounded-3xl space-y-4">
                  <h3 className="font-bold text-base text-stone-900">Recent Customer Orders</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead>
                        <tr className="border-b text-xs text-stone-400 uppercase">
                          <th className="pb-3">Client</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Method</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {stats.recentOrders?.map((ord) => (
                          <tr key={ord._id} className="text-stone-600 dark:text-stone-300">
                            <td className="py-3 font-semibold">{ord.userName || ord.userId.substring(0, 6)}</td>
                            <td className="py-3 font-bold">₹{ord.finalPrice}</td>
                            <td className="py-3">{ord.paymentMethod}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                ord.deliveryStatus === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                              }`}>
                                {ord.deliveryStatus}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button onClick={() => {
                                setActiveTab('orders');
                              }} className="text-organic-green-700 font-bold text-xs">
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS CATALOG (CRUD) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-stone-850">Catalog Products</h3>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '', price: '', stock: '', category: categoriesList[0]?.name || '', description: '',
                      images: '', ingredients: '',
                      dietaryFiber: '', sugar: '', protein: '', vitaminA: '', vitaminC: '', calcium: '', iron: ''
                    });
                    setShowProductModal(true);
                  }}
                  className="bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-md shadow-organic-green-700/10"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Products Table list */}
              <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="border-b bg-stone-50 text-stone-400 text-xs uppercase">
                        <th className="p-4">Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-stone-600 dark:text-stone-300">
                      {productsList.map((p) => (
                        <tr key={p._id} className="hover:bg-stone-50/40">
                          <td className="p-4 flex items-center space-x-3">
                            <img src={p.images?.[0]} alt="" className="h-10 w-10 object-cover rounded-lg border bg-stone-100" />
                            <span className="font-bold text-stone-850 truncate max-w-xs">{p.name}</span>
                          </td>
                          <td className="p-4">{p.category}</td>
                          <td className="p-4 font-bold text-stone-850">₹{p.price}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              p.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-705'
                            }`}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center space-x-3">
                              <button
                                onClick={() => handleEditProductClick(p)}
                                className="p-1.5 text-stone-500 hover:text-organic-green-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
                                title="Edit Product"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              
                              <button
                                onClick={() => handleDeleteProduct(p._id)}
                                className="p-1.5 text-stone-500 hover:text-red-500 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ORDERS STATUS MODIFIER */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-stone-850">Manage Store Orders</h3>

              <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="border-b bg-stone-50 text-stone-400 text-xs uppercase">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Client</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Delivery Status</th>
                        <th className="p-4 text-center">Modify State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-stone-600 dark:text-stone-300">
                      {ordersList.map((ord) => (
                        <tr key={ord._id} className="hover:bg-stone-50/40">
                          <td className="p-4 font-mono font-bold text-xs text-stone-400">#{ord._id.substring(0, 8)}</td>
                          <td className="p-4 font-semibold">{ord.userName || ord.userId.substring(0, 6)}</td>
                          <td className="p-4 font-bold text-stone-850">₹{ord.finalPrice}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.paymentStatus === 'Paid' ? 'bg-green-55 text-green-700' : 'bg-red-55 text-red-700'
                            }`}>
                              {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                              ord.deliveryStatus === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {ord.deliveryStatus}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <select
                              value={ord.deliveryStatus}
                              onChange={(e) => handleOrderStatusUpdate(ord._id, e.target.value)}
                              className="bg-stone-50 border p-1.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-organic-green-600"
                            >
                              <option value="Placed">Placed</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: COUPONS PANEL (CRUD) */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-stone-850">Promotional Discount Coupons</h3>
                <button
                  onClick={() => setShowCouponModal(true)}
                  className="bg-organic-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Coupon</span>
                </button>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="border-b bg-stone-50 text-stone-400 text-xs uppercase">
                        <th className="p-4">Code</th>
                        <th className="p-4">Discount Value</th>
                        <th className="p-4">Min Spend</th>
                        <th className="p-4">Expiry</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-stone-600 dark:text-stone-300">
                      {couponsList.map((c) => (
                        <tr key={c._id} className="hover:bg-stone-50/40">
                          <td className="p-4 font-mono font-bold text-stone-800 dark:text-white bg-amber-50 dark:bg-amber-950/20 w-fit px-2.5 rounded-lg text-xs">{c.code}</td>
                          <td className="p-4 font-semibold">
                            {c.discountType === 'percentage' ? `${c.value}% discount` : `₹${c.value} flat discount`}
                          </td>
                          <td className="p-4">₹{c.minOrderValue}</td>
                          <td className="p-4 text-xs text-stone-400">
                            {c.expiryDate ? new Date(c.expiryDate).toLocaleDateString() : 'Never expires'}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteCoupon(c._id)}
                              className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-stone-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: CATEGORIES PANEL */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-stone-850">Categories Configuration</h3>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="bg-organic-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5 shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {categoriesList.map((cat) => (
                  <div key={cat._id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border">
                    <div className="h-32 bg-stone-100 overflow-hidden relative">
                      <img src={cat.image} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="absolute top-2 right-2 h-8 w-8 bg-white/95 text-red-500 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-stone-850 dark:text-white">{cat.name}</h4>
                      <p className="text-xs text-stone-400 mt-1">{cat.description || 'No description provided'}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      )}

      {/* MODAL 1: PRODUCT ADD/EDIT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 p-6 sm:p-8 rounded-3xl w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-xl text-stone-900 dark:text-white">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Product'}
              </h3>
              <button onClick={() => { setShowProductModal(false); setEditingProduct(null); }}>
                <X className="h-6 w-6 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              
              {/* Product Basic */}
              <div className="space-y-3.5 md:col-span-2">
                <h4 className="font-bold text-stone-800 border-b pb-1 dark:text-white">1. Basic Specifications</h4>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Organic Ragi Flour (5KG)"
                  className="w-full bg-stone-50 border p-2.5 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full bg-stone-50 border p-2.5 rounded-xl dark:bg-stone-900"
                >
                  {categoriesList.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Retail Price (₹)</label>
                <input
                  type="number"
                  required
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="450"
                  className="w-full bg-stone-50 border p-2.5 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Inventory Stock (qty)</label>
                <input
                  type="number"
                  required
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  placeholder="50"
                  className="w-full bg-stone-50 border p-2.5 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-stone-500 text-xs">Images URL (comma-separated)</label>
                <input
                  type="text"
                  value={productForm.images}
                  onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                  placeholder="https://image1.jpg, https://image2.jpg"
                  className="w-full bg-stone-50 border p-2.5 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-stone-500 text-xs">Product Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-stone-50 border p-2.5 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-stone-500 text-xs">Ingredients</label>
                <input
                  type="text"
                  value={productForm.ingredients}
                  onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                  placeholder="100% Certified Organic Finger Millet Flour"
                  className="w-full bg-stone-50 border p-2.5 rounded-xl dark:bg-stone-900"
                />
              </div>

              {/* Product Nutrition */}
              <div className="space-y-3.5 md:col-span-2 pt-4">
                <h4 className="font-bold text-stone-800 border-b pb-1 dark:text-white">2. Nutrition Facts Facts (per 100g)</h4>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Dietary Fiber</label>
                <input
                  type="text"
                  value={productForm.dietaryFiber}
                  onChange={(e) => setProductForm({ ...productForm, dietaryFiber: e.target.value })}
                  placeholder="35g (140% DV)"
                  className="w-full bg-stone-50 border p-2 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Sugar</label>
                <input
                  type="text"
                  value={productForm.sugar}
                  onChange={(e) => setProductForm({ ...productForm, sugar: e.target.value })}
                  placeholder="7.2g"
                  className="w-full bg-stone-50 border p-2 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Protein</label>
                <input
                  type="text"
                  value={productForm.protein}
                  onChange={(e) => setProductForm({ ...productForm, protein: e.target.value })}
                  placeholder="13g (26% DV)"
                  className="w-full bg-stone-50 border p-2 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Vitamin A</label>
                <input
                  type="text"
                  value={productForm.vitaminA}
                  onChange={(e) => setProductForm({ ...productForm, vitaminA: e.target.value })}
                  placeholder="580%"
                  className="w-full bg-stone-50 border p-2 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Vitamin C</label>
                <input
                  type="text"
                  value={productForm.vitaminC}
                  onChange={(e) => setProductForm({ ...productForm, vitaminC: e.target.value })}
                  placeholder="1%"
                  className="w-full bg-stone-50 border p-2 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Calcium</label>
                <input
                  type="text"
                  value={productForm.calcium}
                  onChange={(e) => setProductForm({ ...productForm, calcium: e.target.value })}
                  placeholder="33%"
                  className="w-full bg-stone-50 border p-2 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-stone-500 text-xs">Iron</label>
                <input
                  type="text"
                  value={productForm.iron}
                  onChange={(e) => setProductForm({ ...productForm, iron: e.target.value })}
                  placeholder="96%"
                  className="w-full bg-stone-50 border p-2 rounded-xl dark:bg-stone-900"
                />
              </div>

              <div className="md:col-span-2 pt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => { setShowProductModal(false); setEditingProduct(null); }}
                  className="border px-6 py-2.5 rounded-full font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-organic-green-700 hover:bg-organic-green-800 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md shadow-organic-green-700/10"
                >
                  Save Product
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: COUPON MODAL */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl relative space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg text-stone-900">Create Discount Coupon</h3>
              <button onClick={() => setShowCouponModal(false)}><X className="h-5 w-5 text-stone-400" /></button>
            </div>

            <form onSubmit={handleCouponSubmit} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  placeholder="SAVE20"
                  className="w-full border p-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-500 text-xs">Discount Type</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                    className="w-full border p-2 rounded-xl"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Price (₹)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-500 text-xs">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    placeholder="20"
                    className="w-full border p-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-500 text-xs">Min Spend (₹)</label>
                  <input
                    type="number"
                    value={couponForm.minOrderValue}
                    onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: e.target.value })}
                    placeholder="100"
                    className="w-full border p-2 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-500 text-xs">Expiry Date</label>
                  <input
                    type="date"
                    value={couponForm.expiryDate}
                    onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })}
                    className="w-full border p-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowCouponModal(false)} className="border px-5 py-2.5 rounded-full text-xs font-semibold">Cancel</button>
                <button type="submit" className="bg-organic-green-700 text-white px-5 py-2.5 rounded-full text-xs font-semibold">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CATEGORY CREATE */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-md shadow-2xl relative space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-lg text-stone-900">Create New Category</h3>
              <button onClick={() => setShowCategoryModal(false)}><X className="h-5 w-5 text-stone-400" /></button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Category Name</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="Organic Flours"
                  className="w-full border p-2 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Description</label>
                <input
                  type="text"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Nutritious stone ground flours"
                  className="w-full border p-2 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-500 text-xs">Image URL</label>
                <input
                  type="text"
                  required
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  placeholder="https://image-url.jpg"
                  className="w-full border p-2 rounded-xl"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="border px-5 py-2.5 rounded-full text-xs font-semibold">Cancel</button>
                <button type="submit" className="bg-organic-green-700 text-white px-5 py-2.5 rounded-full text-xs font-semibold">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
export default AdminDashboard;
