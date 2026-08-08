import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { User, ShoppingBag, MapPin, Heart, Key, Phone, CheckCircle, Package, Truck, Smile, Eye } from 'lucide-react';

export const Dashboard = () => {
  const { user, token, logout, wishlist, toggleWishlist, addToCart, API_URL } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'orders');

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Profile edits
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileSuccess, setProfileSuccess] = useState('');

  // Password edits
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/orders/my-orders`);
      if (data.success) {
        setOrders(data.orders);
        if (data.orders.length > 0) {
          setSelectedOrder(data.orders[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSuccess('');
    try {
      const { data } = await axios.put(`${API_URL}/auth/profile`, {
        name: profileName,
        phone: profilePhone
      });
      if (data.success) {
        setProfileSuccess('Profile updated successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    try {
      const { data } = await axios.put(`${API_URL}/auth/change-password`, {
        currentPassword,
        newPassword
      });
      if (data.success) {
        setPasswordSuccess('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'Password update failed');
    }
  };

  // Helper to render delivery status steps
  const renderTrackingTimeline = (order) => {
    const steps = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentStatusIdx = steps.indexOf(order.deliveryStatus);

    return (
      <div className="space-y-6">
        <h4 className="font-bold text-sm text-stone-700 dark:text-stone-300">Order Tracking Timeline</h4>
        <div className="flex flex-col sm:flex-row justify-between items-center relative gap-6 sm:gap-2">
          
          {/* Connector Line - Desktop */}
          <div className="hidden sm:block absolute left-4 right-4 top-4 h-0.5 bg-stone-250 dark:bg-stone-800 -z-10" />

          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStatusIdx;
            const stepTimelineObj = order.timeline?.find(t => t.status === step);

            return (
              <div key={step} className="flex sm:flex-col items-center gap-4 sm:gap-2 z-10 w-full sm:w-auto">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted
                    ? 'bg-organic-green-700 text-white border-organic-green-700'
                    : 'bg-white dark:bg-stone-900 text-stone-300 dark:text-stone-700 border-stone-200 dark:border-stone-850'
                }`}>
                  {step === 'Placed' && <Smile className="h-4 w-4" />}
                  {step === 'Packed' && <Package className="h-4 w-4" />}
                  {step === 'Shipped' && <Truck className="h-4 w-4" />}
                  {step === 'Out for Delivery' && <Truck className="h-4 w-4" />}
                  {step === 'Delivered' && <CheckCircle className="h-4 w-4" />}
                </div>

                <div className="text-left sm:text-center">
                  <div className={`text-xs font-bold ${isCompleted ? 'text-organic-green-700 dark:text-organic-green-400' : 'text-stone-400'}`}>
                    {step}
                  </div>
                  {stepTimelineObj && (
                    <div className="text-[10px] text-stone-400">
                      {new Date(stepTimelineObj.timestamp).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-24 space-y-4">
        <p className="text-stone-500">Sign in to view your dashboard profile details.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Nav Tabs */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="glass-card p-6 rounded-3xl space-y-6">
            
            {/* Header info */}
            <div className="text-center space-y-2 pb-6 border-b border-stone-150">
              <div className="h-16 w-16 bg-organic-green-700 text-white flex items-center justify-center font-bold text-xl rounded-full mx-auto">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-stone-900 dark:text-white">{user.name}</h3>
                <p className="text-xs text-stone-400 font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-1.5">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left text-sm py-2 px-3 rounded-xl flex items-center space-x-2.5 font-bold transition-all ${
                  activeTab === 'orders' ? 'bg-organic-green-700 text-white' : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>My Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left text-sm py-2 px-3 rounded-xl flex items-center space-x-2.5 font-bold transition-all ${
                  activeTab === 'profile' ? 'bg-organic-green-700 text-white' : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full text-left text-sm py-2 px-3 rounded-xl flex items-center space-x-2.5 font-bold transition-all ${
                  activeTab === 'wishlist' ? 'bg-organic-green-700 text-white' : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
              >
                <Heart className="h-4 w-4" />
                <span>Saved Wishlist</span>
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left text-sm py-2 px-3 rounded-xl flex items-center space-x-2.5 font-bold transition-all ${
                  activeTab === 'password' ? 'bg-organic-green-700 text-white' : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
              >
                <Key className="h-4 w-4" />
                <span>Security Settings</span>
              </button>
            </div>

          </div>
        </aside>

        {/* Dashboard Main Content Panel */}
        <section className="flex-grow">
          
          {/* Tab 1: Orders and Tracking */}
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">Order Tracking</h2>
              
              {orders.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Orders list */}
                  <div className="lg:col-span-1 space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord._id}
                        onClick={() => setSelectedOrder(ord)}
                        className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                          selectedOrder?._id === ord._id
                            ? 'border-organic-green-700 bg-organic-green-50/10'
                            : 'border-stone-200 hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex justify-between items-start text-xs">
                          <span className="font-bold text-stone-400">Order #{ord._id.substring(0, 8)}</span>
                          <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase ${
                            ord.deliveryStatus === 'Delivered'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {ord.deliveryStatus}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-stone-850 dark:text-stone-200 mt-2">₹{ord.finalPrice}</div>
                        <div className="text-[10px] text-stone-400 mt-1">{new Date(ord.createdAt).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Tracking & detail details */}
                  {selectedOrder && (
                    <div className="lg:col-span-2 glass-card p-6 rounded-3xl space-y-8 h-fit">
                      
                      {/* Timeline status track */}
                      {renderTrackingTimeline(selectedOrder)}

                      <hr className="border-stone-100 dark:border-stone-800" />

                      {/* Items info */}
                      <div className="space-y-4">
                        <h4 className="font-bold text-sm text-stone-700">Order Items Details</h4>
                        <div className="divide-y divide-stone-100">
                          {selectedOrder.items?.map((item, idx) => (
                            <div key={idx} className="py-3 flex justify-between text-sm">
                              <span className="text-stone-500 truncate max-w-sm">
                                {item.name} <span className="font-bold text-stone-800">x{item.quantity}</span>
                              </span>
                              <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr className="border-stone-100 dark:border-stone-800" />

                      {/* Summary calculations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-500">
                        <div className="space-y-1.5">
                          <p className="font-bold text-stone-850">Shipping Details:</p>
                          <p>{selectedOrder.shippingAddress?.name}</p>
                          <p>{selectedOrder.shippingAddress?.address}</p>
                          <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}</p>
                        </div>
                        <div className="space-y-1.5 text-right md:text-left">
                          <p className="font-bold text-stone-850">Summary:</p>
                          <p>Payment: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
                          <p>Discount: -₹{selectedOrder.discount}</p>
                          <p className="font-extrabold text-sm text-organic-green-800 mt-2">Paid Total: ₹{selectedOrder.finalPrice}</p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-16 border rounded-2xl text-stone-400 italic text-sm">
                  You have no active orders yet.
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Profile Edit */}
          {activeTab === 'profile' && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-xl space-y-6">
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">Profile Details</h2>
              
              {profileSuccess && <p className="text-sm text-green-600 font-bold">{profileSuccess}</p>}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-500">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-500">Email Address (Read-only)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-stone-100 p-2.5 border rounded-xl text-sm cursor-not-allowed text-stone-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-500">Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-organic-green-700 hover:bg-organic-green-800 text-white font-semibold text-sm px-8 py-3 rounded-full"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Wishlist items list */}
          {activeTab === 'wishlist' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">Saved Wishlist</h2>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item._id} className="glass-card rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <div className="relative pt-[80%] bg-stone-100">
                        <img src={item.images?.[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      
                      <div className="p-4 space-y-4">
                        <h4 className="font-bold text-stone-850 truncate text-sm">{item.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-base text-organic-green-800">₹{item.price}</span>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => addToCart(item, 1)}
                              className="bg-organic-green-700 text-white p-2 rounded-lg text-xs font-semibold"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(item)}
                              className="text-red-500 border p-2 rounded-lg text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border rounded-2xl text-stone-400 italic text-sm">
                  Your wishlist is empty.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Security Password change */}
          {activeTab === 'password' && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-xl space-y-6">
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">Change Password</h2>

              {passwordError && <p className="text-sm text-red-500 font-bold">{passwordError}</p>}
              {passwordSuccess && <p className="text-sm text-green-600 font-bold">{passwordSuccess}</p>}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-500">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-stone-500">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-organic-green-700 hover:bg-organic-green-800 text-white font-semibold text-sm px-8 py-3 rounded-full"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}

        </section>

      </div>
    </div>
  );
};
export default Dashboard;
