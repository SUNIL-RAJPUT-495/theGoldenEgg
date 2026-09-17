import axios from 'axios';
import { toast, showToast } from '../context/ToastContext.jsx';

// Base API URL configuration
export const API_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '[::1]'
    ? 'http://localhost:5000/api'
    : 'https://api.thegoldenegg.co.in/api');

// Create configured Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer Token automatically (Separate User & Admin Tokens)
apiClient.interceptors.request.use(
  (config) => {
    // Check if the current request is for admin or originated from admin panel
    const url = config.url || '';
    const isAdminEndpoint = 
      url.includes('/admin') ||
      url.startsWith('/analytics') ||
      url.startsWith('/banners') ||
      url.startsWith('/coupons') ||
      url.startsWith('/inquiries') ||
      url.startsWith('/users');

    const isOnAdminPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

    const adminToken = localStorage.getItem('ge_admin_token');
    const userToken = localStorage.getItem('ge_user_token') || localStorage.getItem('ge_token');

    let tokenToUse = null;
    if (isOnAdminPage || isAdminEndpoint) {
      tokenToUse = adminToken || userToken;
    } else {
      tokenToUse = userToken || adminToken;
    }

    if (tokenToUse) {
      config.headers.Authorization = `Bearer ${tokenToUse}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Toaster notifications & Auth expiration
apiClient.interceptors.response.use(
  (response) => {
    const method = (response.config.method || 'get').toLowerCase();
    const isMutation = ['post', 'put', 'delete', 'patch'].includes(method);
    const hasMessage = response.data && typeof response.data.message === 'string' && response.data.message.trim().length > 0;

    // Trigger toast notification if mutation has a message or if explicit toast requested
    if (!response.config.skipToast && hasMessage && isMutation) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const config = error.config || {};
    const responseData = error.response?.data;
    const statusCode = error.response?.status;

    // Token expiration reset
    if (
      statusCode === 401 &&
      (responseData?.invalidToken || responseData?.message?.toLowerCase().includes('token'))
    ) {
      console.warn('Invalid or expired token detected. Resetting session...');
      const isOnAdminPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
      if (isOnAdminPage) {
        localStorage.removeItem('ge_admin_user');
        localStorage.removeItem('ge_admin_token');
      } else {
        localStorage.removeItem('ge_user');
        localStorage.removeItem('ge_user_token');
        localStorage.removeItem('ge_token');
      }
    }

    // Extract best human-readable error message
    const errorMessage =
      responseData?.message ||
      responseData?.error ||
      error.message ||
      'Server request failed. Please check your network connection.';

    // Show toast notification for errors
    if (!config.skipErrorToast && !config.skipToast) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

// Re-export toast utilities for convenience
export { toast, showToast };

/* =========================================================================
   1. AUTHENTICATION & USER PROFILE APIS
   ========================================================================= */
export const authAPI = {
  signup: async (userData) => {
    const { data } = await apiClient.post('/auth/signup', userData);
    return data;
  },

  login: async (credentials) => {
    const cleanEmail = typeof credentials.email === 'string' ? credentials.email.trim() : credentials.email;
    const { data } = await apiClient.post('/auth/login', { ...credentials, email: cleanEmail });
    return data;
  },

  verifyOtp: async ({ email, otp }) => {
    const { data } = await apiClient.post('/auth/verify-otp', { email, otp });
    return data;
  },

  forgotPassword: async (identifier) => {
    const payload = typeof identifier === 'object' ? identifier : { phone: identifier, identifier };
    const { data } = await apiClient.post('/auth/forgot-password', payload);
    return data;
  },

  resetPassword: async (resetData) => {
    const { data } = await apiClient.post('/auth/reset-password', resetData);
    return data;
  },

  updateProfile: async (profileData) => {
    const { data } = await apiClient.put('/auth/profile', profileData);
    return data;
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    const { data } = await apiClient.put('/auth/change-password', { currentPassword, newPassword });
    return data;
  },

  getAddresses: async () => {
    const { data } = await apiClient.get('/auth/addresses');
    return data;
  },

  addAddress: async (addressData) => {
    const { data } = await apiClient.post('/auth/addresses', addressData);
    return data;
  },
};

/* =========================================================================
   2. PRODUCTS & CATEGORIES APIS
   ========================================================================= */
export const productAPI = {
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    const { data } = await apiClient.get(url);
    return data;
  },

  getProductById: async (id) => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },

  getCategories: async () => {
    const { data } = await apiClient.get('/products/categories/all');
    return data;
  },

  getReviews: async (productId) => {
    const { data } = await apiClient.get(`/products/${productId}/reviews`);
    return data;
  },

  addReview: async (productId, { rating, comment }) => {
    const { data } = await apiClient.post(`/products/${productId}/reviews`, { rating, comment });
    return data;
  },

  uploadImages: async (formData) => {
    const { data } = await apiClient.post('/products/upload-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  createProduct: async (productData) => {
    const { data } = await apiClient.post('/products', productData);
    return data;
  },

  updateProduct: async (id, productData) => {
    const { data } = await apiClient.put(`/products/${id}`, productData);
    return data;
  },

  updateStock: async (productId, stock) => {
    const { data } = await apiClient.put(`/products/${productId}`, { stock });
    return data;
  },

  deleteProduct: async (id) => {
    const { data } = await apiClient.delete(`/products/${id}`);
    return data;
  },
};

/* =========================================================================
   3. ORDERS APIS
   ========================================================================= */
export const orderAPI = {
  placeOrder: async (orderData) => {
    const { data } = await apiClient.post('/orders/place', orderData);
    return data;
  },

  getMyOrders: async () => {
    const { data } = await apiClient.get('/orders/my-orders');
    return data;
  },

  getAllOrders: async () => {
    const { data } = await apiClient.get('/orders');
    return data;
  },

  updateOrderStatus: async (orderId, { deliveryStatus, paymentStatus }) => {
    const { data } = await apiClient.put(`/orders/${orderId}/status`, { deliveryStatus, paymentStatus });
    return data;
  },
};

/* =========================================================================
   4. COUPONS APIS
   ========================================================================= */
export const couponAPI = {
  validateCoupon: async ({ code, cartValue }) => {
    const { data } = await apiClient.post('/coupons/validate', { code, cartValue });
    return data;
  },

  getCoupons: async () => {
    const { data } = await apiClient.get('/coupons');
    return data;
  },

  createCoupon: async (couponData) => {
    const { data } = await apiClient.post('/coupons', couponData);
    return data;
  },

  deleteCoupon: async (id) => {
    const { data } = await apiClient.delete(`/coupons/${id}`);
    return data;
  },
};

/* =========================================================================
   5. BANNERS APIS
   ========================================================================= */
export const bannerAPI = {
  getBanners: async () => {
    const { data } = await apiClient.get('/banners');
    return data;
  },

  createBanner: async (bannerData) => {
    const { data } = await apiClient.post('/banners', bannerData);
    return data;
  },

  deleteBanner: async (id) => {
    const { data } = await apiClient.delete(`/banners/${id}`);
    return data;
  },
};

/* =========================================================================
   6. INQUIRIES & CONTACT APIS
   ========================================================================= */
export const inquiryAPI = {
  submitInquiry: async (formData) => {
    const { data } = await apiClient.post('/inquiries', formData);
    return data;
  },

  getInquiries: async () => {
    const { data } = await apiClient.get('/inquiries');
    return data;
  },

  updateInquiryStatus: async (inquiryId, { status, replyNote }) => {
    const { data } = await apiClient.put(`/inquiries/${inquiryId}/status`, { status, replyNote });
    return data;
  },

  deleteInquiry: async (id) => {
    const { data } = await apiClient.delete(`/inquiries/${id}`);
    return data;
  },
};

/* =========================================================================
   7. USERS MANAGEMENT APIS (ADMIN)
   ========================================================================= */
export const userAPI = {
  getUsers: async () => {
    const { data } = await apiClient.get('/users');
    return data;
  },

  updateUserRole: async (userId, role) => {
    const { data } = await apiClient.put(`/users/${userId}/role`, { role });
    return data;
  },

  updateUserStatus: async (userId, status) => {
    const { data } = await apiClient.put(`/users/${userId}/status`, { status });
    return data;
  },

  updatePassword: async (userId, newPassword) => {
    const { data } = await apiClient.put(`/users/${userId}/password`, { newPassword });
    return data;
  },

  deleteUser: async (userId) => {
    const { data } = await apiClient.delete(`/users/${userId}`);
    return data;
  },
};

/* =========================================================================
   8. ANALYTICS & PAYMENTS APIS
   ========================================================================= */
export const analyticsAPI = {
  getAnalytics: async () => {
    const { data } = await apiClient.get('/analytics');
    return data;
  },
};

export const paymentAPI = {
  getPayments: async () => {
    const { data } = await apiClient.get('/payments');
    return data;
  },
};

/* =========================================================================
   9. ADMIN BULK FETCH API
   ========================================================================= */
export const adminAPI = {
  fetchDashboardData: async () => {
    return Promise.allSettled([
      analyticsAPI.getAnalytics(),
      productAPI.getProducts(),
      orderAPI.getAllOrders(),
      paymentAPI.getPayments(),
      inquiryAPI.getInquiries(),
      userAPI.getUsers(),
      couponAPI.getCoupons(),
      bannerAPI.getBanners(),
      productAPI.getCategories(),
    ]);
  },
};

// Export default API client instance
export default apiClient;
