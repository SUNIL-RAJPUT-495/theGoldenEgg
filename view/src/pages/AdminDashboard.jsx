import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { RefreshCw } from 'lucide-react';

// Modular Admin Components Imports
import { AdminSidebar } from '../comonents/admin/AdminSidebar';
import { AdminOverviewTab } from '../comonents/admin/AdminOverviewTab';
import { AdminProductsTab } from '../comonents/admin/AdminProductsTab';
import { AdminProductModal } from '../comonents/admin/AdminProductModal';
import { AdminOrdersTab } from '../comonents/admin/AdminOrdersTab';
import { AdminOrderModal } from '../comonents/admin/AdminOrderModal';
import { AdminPaymentsTab } from '../comonents/admin/AdminPaymentsTab';
import { AdminInquiriesTab } from '../comonents/admin/AdminInquiriesTab';
import { AdminInquiryModal } from '../comonents/admin/AdminInquiryModal';
import { AdminUsersTab } from '../comonents/admin/AdminUsersTab';
import { AdminMarketingTab } from '../comonents/admin/AdminMarketingTab';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token, API_URL, logout } = useContext(AppContext);

  // Tabs & UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');

  // Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '', weight: '500g', price: '', stock: '', category: 'Organic Flours', description: '',
    images: '', ingredients: '', storageHandling: '', nutritionFacts: []
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyNote, setReplyNote] = useState('');

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '', discountType: 'percentage', value: '', minOrderValue: '', expiryDate: ''
  });

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

  // Reset Search Term on Tab Switch
  useEffect(() => {
    setSearchTerm('');
    setStatusFilter('All');
    setStockFilter('All');
  }, [activeTab]);

  // --- Handlers: Product CRUD & Images Upload ---
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
        weight: product.weight || '500g',
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
        name: '', weight: '500g', price: '', stock: '', category: 'Organic Flours', description: '',
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
    setProductForm(prev => {
      const currentList = Array.isArray(prev.nutritionFacts) ? prev.nutritionFacts : [];
      return {
        ...prev,
        nutritionFacts: [...currentList, { name: '', amount: '' }]
      };
    });
  };

  const handleRemoveNutrientRow = (index) => {
    setProductForm(prev => {
      const currentList = Array.isArray(prev.nutritionFacts) ? prev.nutritionFacts : [];
      return {
        ...prev,
        nutritionFacts: currentList.filter((_, idx) => idx !== index)
      };
    });
  };

  const handleNutrientChange = (index, field, value) => {
    setProductForm(prev => {
      const currentList = Array.isArray(prev.nutritionFacts) ? prev.nutritionFacts : [];
      const updated = [...currentList];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, nutritionFacts: updated };
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const currentList = Array.isArray(productForm.nutritionFacts) ? productForm.nutritionFacts : [];
    const cleanNutritionFacts = currentList
      .filter(item => item && (item.name?.trim() || item.amount?.trim()))
      .map(item => ({ name: (item.name || '').trim(), amount: (item.amount || '').trim() }));

    const payload = {
      name: productForm.name,
      weight: productForm.weight,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock || 0),
      category: productForm.category || 'Organic Flours',
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

  // --- Handlers: Order Status ---
  const handleUpdateOrderStatus = async (orderId, deliveryStatus, paymentStatus) => {
    try {
      await axios.put(`${API_URL}/orders/${orderId}/status`, { deliveryStatus, paymentStatus });
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // --- Handlers: Inquiry Updates ---
  const handleUpdateInquiryStatus = async (inquiryId, status, reply) => {
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

  // --- Handlers: User Role ---
  const handleToggleUserRole = async (userId, newRole) => {
    try {
      await axios.put(`${API_URL}/users/${userId}/role`, { role: newRole });
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  // --- Handlers: Coupons & Banners ---
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

  const handleCreateBanner = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/banners`, bannerForm);
      setShowBannerModal(false);
      setBannerForm({ title: '', subtitle: '', imageUrl: '', linkUrl: '/products' });
      fetchAllAdminData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create banner');
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!window.confirm('Delete banner?')) return;
    try {
      await axios.delete(`${API_URL}/banners/${id}`);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete banner');
    }
  };

  const unreadInquiries = inquiriesList.filter(i => i.status === 'New').length;
  const pendingOrders = ordersList.filter(o => o.deliveryStatus === 'Placed').length;

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center space-y-4 text-stone-300">
        <RefreshCw className="h-10 w-10 text-[#C28E58] animate-spin" />
        <p className="font-serif font-bold text-base">Loading Food Forest Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 flex flex-col lg:flex-row">
      
      {/* 1. Modular Admin Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        logout={logout}
        navigate={navigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        unreadInquiriesCount={unreadInquiries}
        pendingOrdersCount={pendingOrders}
      />

      {/* 2. Main Content View */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 1: Overview */}
        {activeTab === 'dashboard' && (
          <AdminOverviewTab
            stats={stats}
            ordersList={ordersList}
            setActiveTab={setActiveTab}
            setSelectedOrder={setSelectedOrder}
          />
        )}

        {/* TAB 2: Products & Inventory */}
        {activeTab === 'products' && (
          <AdminProductsTab
            productsList={productsList}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
            handleOpenProductModal={handleOpenProductModal}
            handleDeleteProduct={handleDeleteProduct}
            handleQuickStockUpdate={handleQuickStockUpdate}
          />
        )}

        {/* TAB 3: Orders Management */}
        {activeTab === 'orders' && (
          <AdminOrdersTab
            ordersList={ordersList}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            handleUpdateOrderStatus={handleUpdateOrderStatus}
            setSelectedOrder={setSelectedOrder}
          />
        )}

        {/* TAB 4: Payment Records */}
        {activeTab === 'payments' && (
          <AdminPaymentsTab paymentsList={paymentsList} />
        )}

        {/* TAB 5: Customer Inquiries */}
        {activeTab === 'inquiries' && (
          <AdminInquiriesTab
            inquiriesList={inquiriesList}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            setSelectedInquiry={setSelectedInquiry}
            setReplyNote={setReplyNote}
            handleDeleteInquiry={handleDeleteInquiry}
          />
        )}

        {/* TAB 6: User Database */}
        {activeTab === 'users' && (
          <AdminUsersTab
            usersList={usersList}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleToggleUserRole={handleToggleUserRole}
          />
        )}

        {/* TAB 7: Coupons & Banners */}
        {activeTab === 'marketing' && (
          <AdminMarketingTab
            couponsList={couponsList}
            bannersList={bannersList}
            showCouponModal={showCouponModal}
            setShowCouponModal={setShowCouponModal}
            couponForm={couponForm}
            setCouponForm={setCouponForm}
            handleCreateCoupon={handleCreateCoupon}
            handleDeleteCoupon={handleDeleteCoupon}
            showBannerModal={showBannerModal}
            setShowBannerModal={setShowBannerModal}
            bannerForm={bannerForm}
            setBannerForm={setBannerForm}
            handleCreateBanner={handleCreateBanner}
            handleDeleteBanner={handleDeleteBanner}
          />
        )}

      </main>

      {/* 3. Modular Modals */}
      <AdminProductModal
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        editingProduct={editingProduct}
        productForm={productForm}
        setProductForm={setProductForm}
        uploadingImages={uploadingImages}
        handleFileUpload={handleFileUpload}
        handleNutrientChange={handleNutrientChange}
        handleAddNutrientRow={handleAddNutrientRow}
        handleRemoveNutrientRow={handleRemoveNutrientRow}
        handleProductSubmit={handleProductSubmit}
      />

      <AdminOrderModal
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />

      <AdminInquiryModal
        selectedInquiry={selectedInquiry}
        setSelectedInquiry={setSelectedInquiry}
        replyNote={replyNote}
        setReplyNote={setReplyNote}
        handleUpdateInquiryStatus={handleUpdateInquiryStatus}
      />

    </div>
  );
};

export default AdminDashboard;
