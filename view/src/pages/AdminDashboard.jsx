import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, CreditCard, MessageSquare, Users, Tag, Image as ImageIcon,
  Plus, Edit, Trash2, CheckCircle, Clock, AlertCircle, RefreshCw, X, ArrowUpRight, Search, Filter, LogOut,
  ExternalLink, ChevronRight, Eye, ShieldCheck, DollarSign, Box, Check, Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token, API_URL, logout } = useContext(AppContext);

  // Tabs: dashboard, products, orders, payments, inquiries, users, marketing
  const [activeTab, setActiveTab] = useState('dashboard');

  // Data States
  const [stats, setStats] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [couponsList, setCouponsList] = useState([]);
  const [bannersList, setBannersList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All'); // All, Low, Out, Healthy

  const handleQuickStockUpdate = async (productId, newStock) => {
    try {
      const stockVal = Math.max(0, Number(newStock));
      const res = await axios.put(`${API_URL}/products/${productId}`, { stock: stockVal });
      if (res.data.success) {
        setProductsList(prev => prev.map(p => (p._id === productId || p.id === productId) ? { ...p, stock: stockVal } : p));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update stock');
    }
  };

  // Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '', price: '', stock: '', category: 'Organic Flours', description: '',
    images: '', ingredients: '',
    dietaryFiber: '', sugar: '', protein: '', vitaminA: '', vitaminC: '', calcium: '', iron: ''
  });

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.length > 5) {
      alert('You can upload a maximum of 5 images at once.');
    }
    const formData = new FormData();
    files.slice(0, 5).forEach(file => {
      formData.append('images', file);
    });

    setUploadingImages(true);
    try {
      const res = await axios.post(`${API_URL}/products/upload-images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        const uploadedUrls = res.data.imageUrls;
        const currentImages = productForm.images ? productForm.images.split(',').map(s => s.trim()).filter(Boolean) : [];
        const combined = [...currentImages, ...uploadedUrls];
        setProductForm(prev => ({ ...prev, images: combined.join(', ') }));
      }
    } catch (err) {
      console.error('Failed to upload files:', err);
      alert(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingImages(false);
    }
  };

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Inquiry Reply Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyNote, setReplyNote] = useState('');

  // Coupon Modal
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '', discountType: 'percentage', value: '', minOrderValue: '', expiryDate: ''
  });

  // Banner Modal
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: '', subtitle: '', imageUrl: '', linkUrl: '/products'
  });

  // Fetch All Admin Data
  const fetchAllAdminData = async () => {
    try {
      setLoading(true);
      const authHeader = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      
      const results = await Promise.allSettled([
        axios.get(`${API_URL}/analytics`, authHeader),
        axios.get(`${API_URL}/products`, authHeader),
        axios.get(`${API_URL}/orders`, authHeader),
        axios.get(`${API_URL}/payments`, authHeader),
        axios.get(`${API_URL}/inquiries`, authHeader),
        axios.get(`${API_URL}/users`, authHeader),
        axios.get(`${API_URL}/coupons`, authHeader),
        axios.get(`${API_URL}/banners`, authHeader),
        axios.get(`${API_URL}/products/categories/all`, authHeader)
      ]);

      const [statsRes, prodRes, orderRes, payRes, inqRes, userRes, couponRes, bannerRes, catRes] = results;

      if (statsRes.status === 'fulfilled' && statsRes.value?.data?.success) setStats(statsRes.value.data.stats);
      if (prodRes.status === 'fulfilled' && prodRes.value?.data?.success) setProductsList(prodRes.value.data.products || []);
      if (orderRes.status === 'fulfilled' && orderRes.value?.data?.success) setOrdersList(orderRes.value.data.orders || []);
      if (payRes.status === 'fulfilled' && payRes.value?.data?.success) setPaymentsList(payRes.value.data.payments || []);
      if (inqRes.status === 'fulfilled' && inqRes.value?.data?.success) setInquiriesList(inqRes.value.data.inquiries || []);
      if (userRes.status === 'fulfilled' && userRes.value?.data?.success) setUsersList(userRes.value.data.users || []);
      if (couponRes.status === 'fulfilled' && couponRes.value?.data?.success) setCouponsList(couponRes.value.data.coupons || []);
      if (bannerRes.status === 'fulfilled' && bannerRes.value?.data?.success) setBannersList(bannerRes.value.data.banners || []);
      if (catRes.status === 'fulfilled' && catRes.value?.data?.success) setCategoriesList(catRes.value.data.categories || []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminData();
  }, []);

  // --- Handlers: Product CRUD ---
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      
      let initialNutrition = [];
      if (Array.isArray(product.nutritionFacts)) {
        initialNutrition = product.nutritionFacts.map(n => ({ name: n.name || n.label || '', amount: n.amount || n.value || '' }));
      } else if (product.nutritionFacts && typeof product.nutritionFacts === 'object') {
        initialNutrition = Object.entries(product.nutritionFacts)
          .filter(([_, val]) => Boolean(val))
          .map(([key, val]) => ({
            name: key === 'calories' ? 'Energy' : key.charAt(0).toUpperCase() + key.slice(1),
            amount: String(val)
          }));
      }

      if (initialNutrition.length === 0) {
        initialNutrition = [
          { name: 'Energy', amount: '' },
          { name: 'Protein', amount: '' }
        ];
      }

      setProductForm({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || 'Organic Flours',
        description: product.description || '',
        images: product.images ? product.images.join(', ') : '',
        ingredients: product.ingredients || '',
        storageHandling: product.storageHandling || '',
        nutritionFacts: initialNutrition
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '', price: '', stock: '', category: 'Organic Flours', description: '',
        images: '', ingredients: '', storageHandling: '',
        nutritionFacts: [
          { name: 'Energy', amount: '' },
          { name: 'Protein', amount: '' },
          { name: 'Total Fat', amount: '' },
          { name: 'Carbohydrates', amount: '' },
          { name: 'Dietary Fiber', amount: '' }
        ]
      });
    }
    setShowProductModal(true);
  };

  const handleAddNutrientRow = () => {
    setProductForm(prev => ({
      ...prev,
      nutritionFacts: [...prev.nutritionFacts, { name: '', amount: '' }]
    }));
  };

  const handleRemoveNutrientRow = (index) => {
    setProductForm(prev => ({
      ...prev,
      nutritionFacts: prev.nutritionFacts.filter((_, idx) => idx !== index)
    }));
  };

  const handleNutrientChange = (index, field, value) => {
    setProductForm(prev => {
      const updated = [...prev.nutritionFacts];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, nutritionFacts: updated };
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const cleanNutritionFacts = productForm.nutritionFacts
      .filter(item => item.name.trim() || item.amount.trim())
      .map(item => ({ name: item.name.trim(), amount: item.amount.trim() }));

    const payload = {
      name: productForm.name,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock || 0),
      category: productForm.category,
      description: productForm.description,
      images: productForm.images ? productForm.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      ingredients: productForm.ingredients,
      storageHandling: productForm.storageHandling,
      nutritionFacts: cleanNutritionFacts
    };

    try {
      if (editingProduct) {
        const pId = editingProduct._id || editingProduct.id;
        await axios.put(`${API_URL}/products/${pId}`, payload);
      } else {
        await axios.post(`${API_URL}/products`, payload);
      }
      setShowProductModal(false);
      fetchAllAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // --- Handlers: Orders ---
  const handleUpdateOrderStatus = async (orderId, deliveryStatus, paymentStatus) => {
    try {
      await axios.put(`${API_URL}/orders/${orderId}/status`, { deliveryStatus, paymentStatus });
      fetchAllAdminData();
      if (selectedOrder && (selectedOrder._id === orderId || selectedOrder.id === orderId)) {
        setSelectedOrder(prev => ({ ...prev, deliveryStatus, paymentStatus }));
      }
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // --- Handlers: Inquiries ---
  const handleUpdateInquiry = async (inquiryId, status, reply) => {
    try {
      await axios.put(`${API_URL}/inquiries/${inquiryId}/status`, { status, replyNote: reply });
      setSelectedInquiry(null);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to update inquiry');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await axios.delete(`${API_URL}/inquiries/${id}`);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  // --- Handlers: Users ---
  const handleToggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin';
    try {
      await axios.put(`${API_URL}/users/${userId}/role`, { role: newRole });
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  // --- Handlers: Coupons ---
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/coupons`, couponForm);
      setShowCouponModal(false);
      setCouponForm({ code: '', discountType: 'percentage', value: '', minOrderValue: '', expiryDate: '' });
      fetchAllAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    try {
      await axios.delete(`${API_URL}/coupons/${id}`);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete coupon');
    }
  };

  // --- Handlers: Banners ---
  const handleCreateBanner = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/banners`, bannerForm);
      setShowBannerModal(false);
      setBannerForm({ title: '', subtitle: '', imageUrl: '', linkUrl: '/products' });
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to create banner');
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!window.confirm('Delete this banner?')) return;
    try {
      await axios.delete(`${API_URL}/banners/${id}`);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete banner');
    }
  };

  // Filtering Lists
  const filteredProducts = productsList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredOrders = ordersList.filter(o => {
    const matchSearch = (o.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (o._id || o.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.deliveryStatus === statusFilter;
    return matchSearch && matchStatus;
  });
  const filteredInquiries = inquiriesList.filter(i => {
    const matchSearch = (i.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (i.subject || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex h-screen bg-stone-950 text-stone-100 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-stone-900/90 border-r border-stone-800 flex flex-col justify-between shrink-0 shadow-2xl">
        <div>
          {/* Admin Header / Logo */}
          <div className="p-6 border-b border-stone-800/80 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C28E58] to-[#E6C387] flex items-center justify-center font-bold text-stone-950 text-xl shadow-lg">
              🍳
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-white leading-tight"><b>The Golden Egg</b></h2>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#C28E58]">Admin Portal</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
              { id: 'products', label: 'Products', icon: ShoppingBag, badge: productsList.length },
              { id: 'inventory', label: 'Inventory & Stock', icon: Box, badge: productsList.filter(p => p.stock <= 5).length || null, highlight: productsList.some(p => p.stock <= 5) },
              { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: ordersList.length },
              { id: 'payments', label: 'Payments Log', icon: CreditCard, badge: paymentsList.length },
              { id: 'inquiries', label: 'Customer Inquiries', icon: MessageSquare, badge: inquiriesList.filter(i => i.status === 'New').length || null, highlight: true },
              { id: 'users', label: 'Users & Customers', icon: Users, badge: usersList.length },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearchTerm(''); setStatusFilter('All'); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#C28E58] text-stone-950 font-bold shadow-lg shadow-[#C28E58]/20' 
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== null && tab.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      tab.highlight 
                        ? 'bg-amber-500 text-stone-950' 
                        : isActive ? 'bg-stone-950 text-white' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Store Shortcut */}
        <div className="p-4 border-t border-stone-800 space-y-3 bg-stone-950/40">
          <button 
            onClick={() => window.open('/', '_blank')}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-all border border-stone-700/50"
          >
            <ExternalLink className="h-3.5 w-3.5 text-[#C28E58]" />
            <span>Open Website Store</span>
          </button>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#1A2E22] border border-[#C28E58]/40 flex items-center justify-center text-xs font-bold text-[#C28E58]">
                A
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white truncate max-w-[100px]">{user?.name || 'Admin User'}</p>
                <p className="text-[9px] text-emerald-400 font-semibold">Online</p>
              </div>
            </div>

            <button 
              onClick={() => { logout(); navigate('/auth'); }}
              title="Logout"
              className="p-2 text-stone-400 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-all"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 bg-stone-950 overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-16 border-b border-stone-800 bg-stone-900/50 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-serif font-bold text-white capitalize">
              {activeTab === 'marketing' ? 'Coupons & Banners' : activeTab}
            </h1>
            {loading && <RefreshCw className="h-4 w-4 text-[#C28E58] animate-spin" />}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={fetchAllAdminData}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white text-xs font-medium border border-stone-700/60 transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh Data</span>
            </button>
          </div>
        </header>

        {/* DASHBOARD TAB BODY */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              
              {/* Analytics Top Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-emerald-500/10 group-hover:text-emerald-500/20 transition-all">
                    <DollarSign className="h-16 w-16" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Total Revenue</p>
                  <h3 className="text-3xl font-serif font-black text-emerald-400">₹{stats?.totalRevenue?.toLocaleString() || 0}</h3>
                  <p className="text-xs text-stone-400">Lifetime completed sales</p>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-[#C28E58]/10 group-hover:text-[#C28E58]/20 transition-all">
                    <ShoppingCart className="h-16 w-16" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Total Orders</p>
                  <h3 className="text-3xl font-serif font-black text-white">{stats?.totalOrders || 0}</h3>
                  <p className="text-xs text-stone-400">Customer orders placed</p>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-amber-500/10 group-hover:text-amber-500/20 transition-all">
                    <MessageSquare className="h-16 w-16" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Inquiries</p>
                  <h3 className="text-3xl font-serif font-black text-amber-400">{stats?.totalInquiries || 0}</h3>
                  <p className="text-xs text-amber-400 font-semibold">{stats?.newInquiries || 0} New Unresolved</p>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-blue-500/10 group-hover:text-blue-500/20 transition-all">
                    <Users className="h-16 w-16" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Active Customers</p>
                  <h3 className="text-3xl font-serif font-black text-white">{stats?.totalCustomers || 0}</h3>
                  <p className="text-xs text-stone-400">Registered store users</p>
                </div>

              </div>

              {/* Action Bar / Shortcuts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Orders Overview */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold text-white">Recent Orders</h3>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#C28E58] hover:underline flex items-center space-x-1"
                    >
                      <span>View All Orders</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {ordersList.slice(0, 5).map(order => (
                      <div key={order._id || order.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800/80 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white">{order.userName || 'Customer'}</p>
                          <p className="text-[10px] text-stone-400">ID: #{order._id || order.id} • {order.items?.length || 0} Items</p>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="text-xs font-bold text-emerald-400">₹{order.finalPrice}</p>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            order.deliveryStatus === 'Delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {order.deliveryStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                    {ordersList.length === 0 && (
                      <p className="text-xs text-stone-500 text-center py-6">No orders recorded yet.</p>
                    )}
                  </div>
                </div>

                {/* Unresolved Inquiries Box */}
                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif font-bold text-white">Customer Inquiries</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold">
                        {inquiriesList.filter(i => i.status === 'New').length} New
                      </span>
                    </div>

                    <div className="space-y-3">
                      {inquiriesList.slice(0, 4).map(inq => (
                        <div key={inq._id || inq.id} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{inq.name}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                              inq.status === 'New' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-xs text-stone-300 line-clamp-1">{inq.subject}</p>
                        </div>
                      ))}
                      {inquiriesList.length === 0 && (
                        <p className="text-xs text-stone-500 text-center py-6">No customer inquiries yet.</p>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('inquiries')}
                    className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-white transition-all text-center"
                  >
                    Open Inquiries Inbox
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* PRODUCTS TAB BODY */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>

                <button
                  onClick={() => handleOpenProductModal(null)}
                  className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Product Grid Table */}
              <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {filteredProducts.map(prod => (
                      <tr key={prod._id || prod.id} className="hover:bg-stone-800/40 transition-all">
                        <td className="p-4 flex items-center space-x-3">
                          <img
                            src={prod.images?.[0] || '/ragi-flour-5kg.jpg'}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-800 border border-stone-700"
                          />
                          <div>
                            <p className="font-bold text-white">{prod.name}</p>
                            <p className="text-[10px] text-stone-400 line-clamp-1">{prod.description}</p>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-[#C28E58]">{prod.category}</td>
                        <td className="p-4 font-bold text-emerald-400">₹{prod.price}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            prod.stock > 20 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'
                          }`}>
                            {prod.stock} Units
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenProductModal(prod)}
                            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id || prod.id)}
                            className="p-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 transition-all border border-red-800"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-stone-500">No products found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* INVENTORY & STOCK TAB BODY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Inventory Overview Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Stocked Units</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white">
                      {productsList.reduce((acc, p) => acc + (Number(p.stock) || 0), 0)}
                    </span>
                    <Box className="h-5 w-5 text-[#C28E58]" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Low Stock Alert (≤ 10)</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-amber-400">
                      {productsList.filter(p => (Number(p.stock) || 0) <= 10 && (Number(p.stock) || 0) > 0).length}
                    </span>
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Out of Stock (0)</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-red-400">
                      {productsList.filter(p => (Number(p.stock) || 0) <= 0).length}
                    </span>
                    <X className="h-5 w-5 text-red-400" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Inventory Valuation</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-emerald-400">
                      ₹{productsList.reduce((acc, p) => acc + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0).toLocaleString()}
                    </span>
                    <DollarSign className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Toolbar & Filters */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search product inventory by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>

                {/* Stock Filter Pills */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {[
                    { key: 'All', label: 'All Items' },
                    { key: 'Out', label: `Out of Stock (${productsList.filter(p => p.stock <= 0).length})` },
                    { key: 'Low', label: `Low Stock (${productsList.filter(p => p.stock > 0 && p.stock <= 10).length})` },
                    { key: 'Healthy', label: `In Stock (${productsList.filter(p => p.stock > 10).length})` },
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setStockFilter(f.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        stockFilter === f.key
                          ? 'bg-[#C28E58] text-stone-950 shadow-md'
                          : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inventory Table */}
              <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Product Info</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock Status</th>
                      <th className="p-4">Current Stock</th>
                      <th className="p-4 text-center">Quick Add Stock</th>
                      <th className="p-4 text-right">Update Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {productsList
                      .filter(p => {
                        const matchSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            (p.category || '').toLowerCase().includes(searchTerm.toLowerCase());
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
                            <td className="p-4 flex items-center space-x-3">
                              <img
                                src={prod.images?.[0] || '/ragi-flour-5kg.jpg'}
                                alt={prod.name}
                                className="w-10 h-10 rounded-lg object-cover bg-stone-800 border border-stone-700"
                              />
                              <div>
                                <p className="font-bold text-white">{prod.name}</p>
                                <p className="text-[10px] text-[#C28E58] font-semibold">{prod.category}</p>
                              </div>
                            </td>

                            <td className="p-4 font-bold text-emerald-400">₹{prod.price}</td>

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

                            <td className="p-4">
                              <span className="font-bold text-sm text-white">{currStock} units</span>
                            </td>

                            {/* Quick +5, +10, +50 buttons */}
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
                                  Clear (0)
                                </button>
                              </div>
                            </td>

                            {/* Custom Stock Input Field */}
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <input
                                  type="number"
                                  min="0"
                                  defaultValue={currStock}
                                  id={`stock_input_${pid}`}
                                  className="w-20 bg-stone-950 border border-stone-800 text-center px-2 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-[#C28E58]"
                                />
                                <button
                                  onClick={() => {
                                    const input = document.getElementById(`stock_input_${pid}`);
                                    if (input) handleQuickStockUpdate(pid, input.value);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-[#C28E58] hover:bg-[#b07e4a] text-stone-950 font-bold text-xs transition-all shadow"
                                >
                                  Save
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                    {productsList.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-stone-500">No products found in inventory.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ORDERS TAB BODY */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by customer name or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-400">Filter:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-stone-900 border border-stone-800 px-3 py-2 rounded-xl text-xs text-stone-200 focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Placed">Placed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Delivery Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {filteredOrders.map(order => (
                      <tr key={order._id || order.id} className="hover:bg-stone-800/40 transition-all">
                        <td className="p-4 font-mono text-[11px] text-stone-400">#{order._id || order.id}</td>
                        <td className="p-4">
                          <p className="font-bold text-white">{order.userName || 'Customer'}</p>
                          <p className="text-[10px] text-stone-400">{order.shippingAddress?.phone}</p>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-stone-300">{order.paymentMethod}</span>
                          <span className={`block text-[10px] font-bold ${
                            order.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-emerald-400">₹{order.finalPrice}</td>
                        <td className="p-4">
                          <select
                            value={order.deliveryStatus}
                            onChange={(e) => handleUpdateOrderStatus(order._id || order.id, e.target.value, order.paymentStatus)}
                            className="bg-stone-950 border border-stone-800 text-xs text-amber-300 font-bold px-3 py-1.5 rounded-lg focus:outline-none"
                          >
                            <option value="Placed">Placed</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all flex items-center space-x-1 ml-auto"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-stone-500">No orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* PAYMENTS LOG TAB BODY */}
          {activeTab === 'payments' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 space-y-4">
                <h3 className="text-lg font-serif font-bold text-white">Payment Transactions Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <p className="text-stone-400">Total Transactions</p>
                    <p className="text-2xl font-bold text-white mt-1">{paymentsList.length}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <p className="text-stone-400">Successful Online / COD Paid</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">
                      ₹{paymentsList.reduce((sum, p) => p.paymentStatus === 'Paid' ? sum + (p.amount || 0) : sum, 0)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <p className="text-stone-400">Pending COD Collection</p>
                    <p className="text-2xl font-bold text-amber-400 mt-1">
                      ₹{paymentsList.reduce((sum, p) => p.paymentStatus === 'Pending' ? sum + (p.amount || 0) : sum, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Txn ID / Order</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Method</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {paymentsList.map(pay => (
                      <tr key={pay._id || pay.id} className="hover:bg-stone-800/40 transition-all">
                        <td className="p-4">
                          <p className="font-mono text-xs text-white font-bold">{pay.transactionId || 'TXN_N/A'}</p>
                          <p className="text-[10px] text-stone-400">Order #{pay.orderId}</p>
                        </td>
                        <td className="p-4 font-semibold text-white">{pay.userName || 'Customer'}</td>
                        <td className="p-4 font-semibold text-[#C28E58]">{pay.paymentMethod}</td>
                        <td className="p-4 font-bold text-emerald-400">₹{pay.amount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            pay.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {pay.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4 text-stone-400">{new Date(pay.createdAt || Date.now()).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {paymentsList.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-stone-500">No payment logs found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INQUIRIES TAB BODY */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by customer name or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 pl-10 pr-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-400">Filter:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-stone-900 border border-stone-800 px-3 py-2 rounded-xl text-xs text-stone-200 focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInquiries.map(inq => (
                  <div key={inq._id || inq.id} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 relative flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">{inq.name}</h4>
                          <p className="text-xs text-stone-400">{inq.email} • {inq.phone || 'No Phone'}</p>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          inq.status === 'New' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                          inq.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                          'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}>
                          {inq.status}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-1">
                        <p className="font-bold text-[#C28E58]">{inq.subject}</p>
                        <p className="leading-relaxed">{inq.message}</p>
                      </div>

                      {inq.replyNote && (
                        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200">
                          <p className="font-bold text-[10px] uppercase text-emerald-400">Admin Note:</p>
                          <p>{inq.replyNote}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                      <span className="text-[10px] text-stone-500">{new Date(inq.createdAt || Date.now()).toLocaleString()}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => { setSelectedInquiry(inq); setReplyNote(inq.replyNote || ''); }}
                          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200"
                        >
                          Update / Note
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq._id || inq.id)}
                          className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-800"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredInquiries.length === 0 && (
                  <div className="col-span-2 p-12 text-center text-stone-500 bg-stone-900 rounded-2xl border border-stone-800">
                    No customer inquiries match your query.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* USERS TAB BODY */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Orders Placed</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {usersList.map(u => (
                      <tr key={u._id || u.id} className="hover:bg-stone-800/40 transition-all">
                        <td className="p-4 font-bold text-white">{u.name}</td>
                        <td className="p-4 text-stone-300">{u.email}</td>
                        <td className="p-4 text-stone-400">{u.phone || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            u.role === 'admin' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-stone-800 text-stone-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-emerald-400">{u.orderCount || 0} Orders</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleToggleUserRole(u._id || u.id, u.role)}
                            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200"
                          >
                            Toggle Role ({u.role === 'admin' ? 'Make Customer' : 'Make Admin'})
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MARKETING TAB BODY */}
          {activeTab === 'marketing' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              
              {/* Coupons Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-white">Discount Coupons</h3>
                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Coupon</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {couponsList.map(c => (
                    <div key={c._id || c.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-base text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">{c.code}</span>
                          <button 
                            onClick={() => handleDeleteCoupon(c._id || c.id)}
                            className="text-stone-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-stone-300 font-bold pt-2">
                          Discount: {c.discountType === 'percentage' ? `${c.value}% OFF` : `₹${c.value} FLAT OFF`}
                        </p>
                        <p className="text-[11px] text-stone-400">Min Order: ₹{c.minOrderValue || 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banners Section */}
              <div className="space-y-4 pt-4 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-white">Homepage Hero Banners</h3>
                  <button
                    onClick={() => setShowBannerModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Banner</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bannersList.map(b => (
                    <div key={b._id || b.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                      <img src={b.imageUrl} alt={b.title} className="w-full h-36 rounded-xl object-cover bg-stone-950 border border-stone-800" />
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-xs">{b.title || 'Banner'}</h4>
                          <p className="text-[10px] text-stone-400">{b.subtitle}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteBanner(b._id || b.id)}
                          className="text-stone-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="text-xl font-serif font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-stone-300 font-bold">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-300 font-bold">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  >
                    <option value="Organic Flours">Organic Flours</option>
                    <option value="Culinary Foundations">Culinary Foundations</option>
                    <option value="Botanical Apothecary">Botanical Apothecary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-stone-300 font-bold">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-300 font-bold">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>
              </div>

              {/* Multi-Image File Upload (Multer) */}
              <div className="space-y-2">
                <label className="block text-stone-300 font-bold">
                  Product Images (Upload 4-5 Pictures)
                </label>
                
                {/* File Upload Trigger */}
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
                  <div className="flex flex-wrap gap-2 pt-2">
                    {productForm.images.split(',').map(s => s.trim()).filter(Boolean).map((url, idx) => (
                      <div key={idx} className="relative group w-16 h-16 rounded-xl overflow-hidden border border-stone-700 bg-stone-950">
                        <img src={url} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const current = productForm.images.split(',').map(s => s.trim()).filter(Boolean);
                            current.splice(idx, 1);
                            setProductForm({ ...productForm, images: current.join(', ') });
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-950/90 text-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-all"
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

              <div className="space-y-1">
                <label className="block text-stone-300 font-bold">Description</label>
                <textarea
                  rows={2}
                  placeholder="Detailed product story and description..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-stone-300 font-bold">Ingredients</label>
                  <textarea
                    rows={2}
                    placeholder="100% Pure Organic Leaf Powder..."
                    value={productForm.ingredients}
                    onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-300 font-bold">Storage & Handling</label>
                  <textarea
                    rows={2}
                    placeholder="Store in a cool, dry place away from direct sunlight..."
                    value={productForm.storageHandling}
                    onChange={(e) => setProductForm({ ...productForm, storageHandling: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
                  />
                </div>
              </div>

              {/* Dynamic Nutrition Facts Section */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">Nutrition Facts (Amount per 100g)</h4>
                    <p className="text-[10px] text-stone-400">Add or remove custom nutrient rows for this product</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNutrientRow}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#C28E58] text-stone-950 font-bold text-[11px] hover:bg-[#b07e4a] transition-all shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Nutrient</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {productForm.nutritionFacts?.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-stone-900 p-2 rounded-xl border border-stone-800">
                      <input
                        type="text"
                        placeholder="Nutrient Name (e.g. Energy, Calcium, Protein)"
                        value={item.name}
                        onChange={(e) => handleNutrientChange(idx, 'name', e.target.value)}
                        className="flex-1 bg-stone-950 border border-stone-800 px-2.5 py-1.5 rounded-lg text-white text-xs focus:outline-none focus:border-[#C28E58]"
                      />
                      <input
                        type="text"
                        placeholder="Amount (e.g. 205 kcal, 33%, 27.1 g)"
                        value={item.amount}
                        onChange={(e) => handleNutrientChange(idx, 'amount', e.target.value)}
                        className="flex-1 bg-stone-950 border border-stone-800 px-2.5 py-1.5 rounded-lg text-white text-xs focus:outline-none focus:border-[#C28E58]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNutrientRow(idx)}
                        className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors"
                        title="Delete nutrient row"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {(!productForm.nutritionFacts || productForm.nutritionFacts.length === 0) && (
                    <p className="text-center text-[11px] text-stone-500 py-2 italic">
                      No nutrients added yet. Click "+ Add Nutrient" above to create one.
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow-lg"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-lg rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h3 className="text-base font-serif font-bold text-white">Order Details</h3>
                <p className="text-[10px] text-stone-400">ID: #{selectedOrder._id || selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <p className="font-bold text-white">{selectedOrder.shippingAddress?.name}</p>
                <p className="text-stone-300">{selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}</p>
                <p className="text-stone-400">Phone: {selectedOrder.shippingAddress?.phone}</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-white">Items Ordered:</p>
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-[10px] text-stone-400">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <p className="font-bold text-emerald-400">₹{item.quantity * item.price}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-sm font-bold">
                <span className="text-stone-300">Total Amount Paid:</span>
                <span className="text-emerald-400">₹{selectedOrder.finalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INQUIRY REPLY & NOTE */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="text-base font-serif font-bold text-white">Update Inquiry</h3>
              <button onClick={() => setSelectedInquiry(null)} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold mb-1">Status</label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => setSelectedInquiry({ ...selectedInquiry, status: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Admin Resolution / Reply Note</label>
                <textarea
                  rows={4}
                  value={replyNote}
                  onChange={(e) => setReplyNote(e.target.value)}
                  placeholder="Enter response notes..."
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                />
              </div>

              <button
                onClick={() => handleUpdateInquiry(selectedInquiry._id || selectedInquiry.id, selectedInquiry.status, replyNote)}
                className="w-full py-3 rounded-xl bg-[#C28E58] text-stone-950 font-bold hover:bg-[#b07e4a] transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE COUPON */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="text-base font-serif font-bold text-white">Create Coupon</h3>
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
                  placeholder="e.g. ORGANIC20"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Type</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    placeholder="10 or 100"
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Min Order Value (₹)</label>
                <input
                  type="number"
                  placeholder="200"
                  value={couponForm.minOrderValue}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C28E58] text-stone-950 font-bold hover:bg-[#b07e4a] transition-all"
              >
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE BANNER */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="text-base font-serif font-bold text-white">Add Hero Banner</h3>
              <button onClick={() => setShowBannerModal(false)} className="text-stone-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBanner} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={bannerForm.imageUrl}
                  onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Rooted in Nature..."
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="100% Certified Organic Ragi..."
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C28E58] text-stone-950 font-bold hover:bg-[#b07e4a] transition-all"
              >
                Save Banner
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
