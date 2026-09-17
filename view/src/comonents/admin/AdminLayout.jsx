import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { RefreshCw } from 'lucide-react';
import { 
  adminAPI,
  productAPI, 
  orderAPI, 
  inquiryAPI, 
  userAPI, 
  couponAPI, 
  bannerAPI 
} from '../../services/api.js';

import { AdminSidebar } from './AdminSidebar';
import { AdminProductModal } from './AdminProductModal';
import { AdminOrderModal } from './AdminOrderModal';
import { AdminInquiryModal } from './AdminInquiryModal';
import { AdminUserModal } from './AdminUserModal';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, token, logout, adminUser, adminToken, adminLogout } = useContext(AppContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  // Shared Data States
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

  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '', weight: '500g', price: '', stock: '', category: 'Organic Flours', description: '',
    images: '', ingredients: '', storageHandling: '', nutritionFacts: []
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
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
      const results = await adminAPI.fetchDashboardData();

      const [statsRes, prodRes, orderRes, payRes, inqRes, userRes, couponRes, bannerRes, catRes] = results;

      if (statsRes.status === 'fulfilled' && statsRes.value?.success) setStats(statsRes.value.stats);
      if (prodRes.status === 'fulfilled' && prodRes.value?.success) setProductsList(prodRes.value.products || []);
      if (orderRes.status === 'fulfilled' && orderRes.value?.success) setOrdersList(orderRes.value.orders || []);
      if (payRes.status === 'fulfilled' && payRes.value?.success) setPaymentsList(payRes.value.payments || []);
      if (inqRes.status === 'fulfilled' && inqRes.value?.success) setInquiriesList(inqRes.value.inquiries || []);
      if (userRes.status === 'fulfilled' && userRes.value?.success) setUsersList(userRes.value.users || []);
      if (couponRes.status === 'fulfilled' && couponRes.value?.success) setCouponsList(couponRes.value.coupons || []);
      if (bannerRes.status === 'fulfilled' && bannerRes.value?.success) setBannersList(bannerRes.value.banners || []);
      if (catRes.status === 'fulfilled' && catRes.value?.success) setCategoriesList(catRes.value.categories || []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminData();
  }, []);

  // Handlers
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
      const res = await productAPI.uploadImages(formData);
      if (res.success) {
        const uploadedUrls = res.imageUrls;
        const currentImages = productForm.images ? productForm.images.split(',').map(s => s.trim()).filter(Boolean) : [];
        const combined = [...currentImages, ...uploadedUrls];
        setProductForm(prev => ({ ...prev, images: combined.join(', ') }));
      }
    } catch (err) {
      console.error('Failed to upload files:', err);
      alert(err.response?.data?.message || err.message || 'Image upload failed');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleQuickStockUpdate = async (productId, newStock) => {
    try {
      const stockVal = Math.max(0, Number(newStock));
      const res = await productAPI.updateStock(productId, stockVal);
      if (res.success) {
        setProductsList(prev => prev.map(p => (p._id === productId || p.id === productId) ? { ...p, stock: stockVal } : p));
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to update stock');
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
      return { ...prev, nutritionFacts: [...currentList, { name: '', amount: '' }] };
    });
  };

  const handleRemoveNutrientRow = (index) => {
    setProductForm(prev => {
      const currentList = Array.isArray(prev.nutritionFacts) ? prev.nutritionFacts : [];
      return { ...prev, nutritionFacts: currentList.filter((_, idx) => idx !== index) };
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
        await productAPI.updateProduct(pId, payload);
      } else {
        await productAPI.createProduct(payload);
      }
      setShowProductModal(false);
      fetchAllAdminData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.deleteProduct(id);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, deliveryStatus, paymentStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, { deliveryStatus, paymentStatus });
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const handleUpdateInquiryStatus = async (inquiryId, status, reply) => {
    try {
      await inquiryAPI.updateInquiryStatus(inquiryId, { status, replyNote: reply });
      setSelectedInquiry(null);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to update inquiry');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await inquiryAPI.deleteInquiry(id);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const handleToggleUserRole = async (userId, newRole) => {
    try {
      await userAPI.updateUserRole(userId, newRole);
      setUsersList(prev => prev.map(u => (u._id === userId || u.id === userId) ? { ...u, role: newRole } : u));
      if (selectedUser && (selectedUser._id === userId || selectedUser.id === userId)) {
        setSelectedUser(prev => ({ ...prev, role: newRole }));
      }
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  const handleUpdateUserStatus = async (userId, newStatus) => {
    try {
      const res = await userAPI.updateUserStatus(userId, newStatus);
      if (res.success) {
        setUsersList(prev => prev.map(u => (u._id === userId || u.id === userId) ? { ...u, status: newStatus } : u));
        if (selectedUser && (selectedUser._id === userId || selectedUser.id === userId)) {
          setSelectedUser(prev => ({ ...prev, status: newStatus }));
        }
      }
      fetchAllAdminData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to update user status');
    }
  };

  const handleUpdateUserPassword = async (userId, newPassword) => {
    try {
      const res = await userAPI.updatePassword(userId, newPassword);
      return res;
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user account?')) return;
    try {
      await userAPI.deleteUser(userId);
      setSelectedUser(null);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await couponAPI.createCoupon(couponForm);
      setShowCouponModal(false);
      setCouponForm({ code: '', discountType: 'percentage', value: '', minOrderValue: '', expiryDate: '' });
      fetchAllAdminData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to create coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    try {
      await couponAPI.deleteCoupon(id);
      fetchAllAdminData();
    } catch (err) {
      alert('Failed to delete coupon');
    }
  };

  const handleCreateBanner = async (e) => {
    e.preventDefault();
    try {
      await bannerAPI.createBanner(bannerForm);
      setShowBannerModal(false);
      setBannerForm({ title: '', subtitle: '', imageUrl: '', linkUrl: '/products' });
      fetchAllAdminData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to create banner');
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!window.confirm('Delete banner?')) return;
    try {
      await bannerAPI.deleteBanner(id);
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
        <p className="font-serif font-bold text-base">Loading Food Forest Admin Panel...</p>
      </div>
    );
  }

  const adminContextValue = {
    stats,
    productsList,
    ordersList,
    paymentsList,
    inquiriesList,
    usersList,
    couponsList,
    bannersList,
    categoriesList,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    stockFilter,
    setStockFilter,
    handleOpenProductModal,
    handleDeleteProduct,
    handleQuickStockUpdate,
    handleUpdateOrderStatus,
    setSelectedOrder,
    selectedInquiry,
    setSelectedInquiry,
    selectedUser,
    setSelectedUser,
    setReplyNote,
    handleDeleteInquiry,
    handleToggleUserRole,
    handleUpdateUserStatus,
    handleUpdateUserPassword,
    handleDeleteUser,
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
  };

  return (
    <div className="h-screen w-full bg-stone-950 font-sans text-stone-100 flex flex-col lg:flex-row overflow-hidden select-none">
      <AdminSidebar
        user={adminUser || user}
        logout={adminLogout || logout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        unreadInquiriesCount={unreadInquiries}
        pendingOrdersCount={pendingOrders}
      />

      <main className="flex-1 h-screen overflow-y-auto bg-stone-950 p-4 sm:p-8 overscroll-contain select-auto">
        <div className="max-w-7xl mx-auto w-full pb-24">
          {/* Child Router Outlet with shared Context */}
          <Outlet context={adminContextValue} />
        </div>
      </main>

      {/* Shared Modals */}
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

      <AdminUserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        ordersList={ordersList}
        handleUpdateUserStatus={handleUpdateUserStatus}
        handleToggleUserRole={handleToggleUserRole}
        handleUpdateUserPassword={handleUpdateUserPassword}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};
