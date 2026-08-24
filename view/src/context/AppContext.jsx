import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '[::1]'
    ? 'http://localhost:5000/api'
    : 'http://api.thegoldenegg.co.in/api');

export const AppProvider = ({ children }) => {
  // Load initial states from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ge_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [token, setToken] = useState(() => {
    return localStorage.getItem('ge_token') || null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ge_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ge_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('ge_dark') === 'true';
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('ge_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ge_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('ge_token', token);
    } else {
      localStorage.removeItem('ge_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('ge_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ge_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ge_dark', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Set default auth headers for Axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Initial loads
  const loadInitialData = async () => {
    try {
      await fetchCategories();
      await fetchProducts();
      await fetchBanners();
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [token]);

  // --- Auth Handlers ---
  const signup = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, { name, email, password, phone });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error.response?.data || { success: false, message: 'Signup failed' };
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
      }
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error.response?.data || { success: false, message: 'OTP validation failed' };
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
      }
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error.response?.data || { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setWishlist([]);
    setAppliedCoupon(null);
    localStorage.removeItem('ge_user');
    localStorage.removeItem('ge_token');
    localStorage.removeItem('ge_cart');
    localStorage.removeItem('ge_wishlist');
  };

  // --- Data Fetching Hooks ---
  const fetchProducts = async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const { data } = await axios.get(`${API_URL}/products?${params.toString()}`);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products/categories/all`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBanners = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/banners`);
      if (data.success) {
        setBanners(data.banners);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  // --- Cart Operators ---
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.productId === (product._id || product.productId));
      if (existing) {
        return prevCart.map(item => 
          item.productId === (product._id || product.productId)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            productId: product._id || product.productId,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || product.image || '',
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        item.productId === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // --- Wishlist Handlers ---
  const toggleWishlist = (product) => {
    setWishlist(prevList => {
      const exists = prevList.some(item => item._id === product._id);
      if (exists) {
        return prevList.filter(item => item._id !== product._id);
      } else {
        return [...prevList, product];
      }
    });
  };

  // --- Coupon Logic ---
  const applyCoupon = async (code) => {
    if (!code) return { success: false, message: 'Please enter a code' };
    const cartValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    try {
      const { data } = await axios.post(`${API_URL}/coupons/validate`, { code, cartValue });
      if (data.success) {
        setAppliedCoupon(data.coupon);
      }
      return data;
    } catch (error) {
      setAppliedCoupon(null);
      throw error.response?.data || { success: false, message: 'Coupon invalid' };
    }
  };

  // --- Checkout Operators ---
  const getCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = (subtotal * appliedCoupon.value) / 100;
      } else {
        discount = appliedCoupon.value;
      }
    }
    
    const deliveryCharges = subtotal > 500 || subtotal === 0 ? 0 : 50; // Free delivery above 500
    const finalTotal = Math.max(0, subtotal - discount + deliveryCharges);

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      deliveryCharges,
      finalTotal: parseFloat(finalTotal.toFixed(2))
    };
  };

  const placeOrder = async (shippingAddress, paymentMethod) => {
    const totals = getCartTotals();
    
    const orderData = {
      items: cart,
      shippingAddress,
      paymentMethod,
      couponCode: appliedCoupon?.code || null,
      totalPrice: totals.subtotal,
      discount: totals.discount,
      deliveryCharges: totals.deliveryCharges,
      finalPrice: totals.finalTotal
    };

    try {
      const { data } = await axios.post(`${API_URL}/orders/place`, orderData);
      if (data.success) {
        clearCart();
      }
      return data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Order placement failed' };
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      token,
      cart,
      wishlist,
      darkMode,
      setDarkMode,
      products,
      categories,
      banners,
      loading,
      appliedCoupon,
      setAppliedCoupon,
      signup,
      verifyOtp,
      login,
      logout,
      fetchProducts,
      fetchCategories,
      fetchBanners,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      toggleWishlist,
      applyCoupon,
      getCartTotals,
      placeOrder,
      API_URL
    }}>
      {children}
    </AppContext.Provider>
  );
};
