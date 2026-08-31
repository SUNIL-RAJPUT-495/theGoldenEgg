import React from 'react';
import { X, User, Mail, Phone, Calendar, ShoppingBag, MapPin, Shield, CheckCircle, CreditCard, DollarSign } from 'lucide-react';

export const AdminUserModal = ({ selectedUser, setSelectedUser, ordersList = [] }) => {
  if (!selectedUser) return null;

  const uId = selectedUser._id || selectedUser.id;
  const uEmail = (selectedUser.email || '').toLowerCase();
  const uPhone = (selectedUser.phone || '').trim();

  // Find all orders placed by this user
  const userOrders = ordersList.filter(o => {
    const oUserId = String(o.userId || o.user?._id || o.user || '');
    const oEmail = (o.userEmail || o.email || o.shippingAddress?.email || '').toLowerCase();
    const oPhone = (o.shippingAddress?.phone || '').trim();
    
    return (
      (uId && oUserId === String(uId)) ||
      (uEmail && oEmail === uEmail) ||
      (uPhone && oPhone && oPhone.includes(uPhone))
    );
  });

  const totalSpent = userOrders.reduce((sum, o) => sum + (Number(o.finalPrice) || 0), 0);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#C28E58] to-stone-800 p-0.5 shadow-lg flex items-center justify-center font-bold text-stone-950 text-lg">
              {selectedUser.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                {selectedUser.name || 'User Profile'}
              </h3>
              <p className="text-[11px] text-stone-400 font-mono">Account ID: #{uId}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedUser(null)} 
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 text-xs overflow-y-auto pr-1 max-h-[70vh]">
          
          {/* User Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block flex items-center space-x-1">
                <Mail className="h-3 w-3 text-[#C28E58] inline mr-1" />
                Email Address
              </span>
              <p className="font-bold text-white font-mono truncate">{selectedUser.email || 'N/A'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block flex items-center space-x-1">
                <Phone className="h-3 w-3 text-[#C28E58] inline mr-1" />
                Phone Number
              </span>
              <p className="font-bold text-white font-mono">{selectedUser.phone || 'N/A'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block flex items-center space-x-1">
                <Shield className="h-3 w-3 text-[#C28E58] inline mr-1" />
                Account Role
              </span>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                selectedUser.role === 'admin' 
                  ? 'bg-[#C28E58]/20 text-[#C28E58] border border-[#C28E58]/40' 
                  : 'bg-stone-800 text-stone-300 border border-stone-700'
              }`}>
                {selectedUser.role === 'admin' ? 'ADMINISTRATOR' : 'CUSTOMER'}
              </span>
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Total Amount Spent</p>
                <p className="text-lg font-black text-emerald-400">₹{totalSpent.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-right">
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Orders Placed</p>
                <p className="text-lg font-black text-white">{userOrders.length} Orders</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#C28E58]/10 text-[#C28E58] border border-[#C28E58]/20">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* User Orders History List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <h4 className="font-bold text-white text-xs sm:text-sm flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-[#C28E58]" />
                <span>Order History ({userOrders.length})</span>
              </h4>
            </div>

            {userOrders.length > 0 ? (
              <div className="space-y-3">
                {userOrders.map((order) => {
                  const oId = order._id || order.id;
                  return (
                    <div key={oId} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[11px] font-bold text-stone-300">#{oId}</span>
                          <p className="text-[10px] text-stone-400">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent Order'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-400 text-sm">₹{order.finalPrice}</span>
                          <span className="block text-[10px] font-bold text-stone-400">{order.paymentMethod}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5 pt-2 border-t border-stone-900">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px] text-stone-300">
                            <span>• {item.name} <span className="text-stone-500 font-bold">× {item.quantity}</span></span>
                            <span className="font-bold text-stone-400">₹{item.quantity * item.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Status Badge */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-900 text-[10px]">
                        <span className="text-stone-400">
                          Deliver To: <strong className="text-stone-300">{order.shippingAddress?.city}, {order.shippingAddress?.state}</strong>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-stone-800 text-[#C28E58] border border-stone-700">
                          {order.deliveryStatus || 'Placed'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center text-stone-500">
                <ShoppingBag className="h-6 w-6 text-stone-600 mx-auto mb-2" />
                <p>No orders placed by this user yet.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
