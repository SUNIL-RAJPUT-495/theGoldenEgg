import React, { useState } from 'react';
import { 
  X, Mail, Phone, Shield, DollarSign, ShoppingBag, 
  Ban, ShieldAlert, CheckCircle, AlertTriangle, UserCheck, Trash2
} from 'lucide-react';

export const AdminUserModal = ({ 
  selectedUser, 
  setSelectedUser, 
  ordersList = [], 
  handleUpdateUserStatus,
  handleToggleUserRole,
  handleDeleteUser
}) => {
  if (!selectedUser) return null;

  const uId = selectedUser._id || selectedUser.id;
  const uEmail = (selectedUser.email || '').toLowerCase();
  const uPhone = (selectedUser.phone || '').trim();
  const currentStatus = selectedUser.status || 'Active';
  const currentRole = selectedUser.role || 'customer';

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
              <div className="flex items-center space-x-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                  {selectedUser.name || 'User Profile'}
                </h3>
                
                {/* Account Status Badge */}
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                  currentStatus === 'Active'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : currentStatus === 'Suspended'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-red-950 text-red-400 border-red-800'
                }`}>
                  {currentStatus}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono pt-0.5">Account ID: #{uId}</p>
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
          
          {/* Admin Control Panel: Block / Suspend / Unblock & Role Toggle */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
              <ShieldAlert className="h-4 w-4 text-[#C28E58]" />
              <span>Admin Management Actions</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              {/* Account Status Actions */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-stone-400 font-bold block">Account Access Status:</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleUpdateUserStatus(uId, 'Active')}
                    className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center space-x-1 border ${
                      currentStatus === 'Active'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                        : 'bg-stone-900 text-stone-300 hover:text-white border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Active</span>
                  </button>

                  <button
                    onClick={() => handleUpdateUserStatus(uId, 'Suspended')}
                    className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center space-x-1 border ${
                      currentStatus === 'Suspended'
                        ? 'bg-amber-600 text-white border-amber-500 shadow'
                        : 'bg-stone-900 text-stone-300 hover:text-white border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Suspend</span>
                  </button>

                  <button
                    onClick={() => handleUpdateUserStatus(uId, 'Blocked')}
                    className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center space-x-1 border ${
                      currentStatus === 'Blocked'
                        ? 'bg-red-600 text-white border-red-500 shadow'
                        : 'bg-stone-900 text-stone-300 hover:text-white border-stone-800 hover:bg-stone-800'
                    }`}
                  >
                    <Ban className="h-3.5 w-3.5" />
                    <span>Block</span>
                  </button>
                </div>
              </div>

              {/* Role Toggle Action */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-stone-400 font-bold block">User Permissions & Role:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleUserRole(uId, currentRole === 'admin' ? 'customer' : 'admin')}
                    className={`w-full py-2 px-3 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center space-x-1.5 border ${
                      currentRole === 'admin'
                        ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
                        : 'bg-[#C28E58] hover:bg-[#b07e4a] text-stone-950 border-[#C28E58]'
                    }`}
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>{currentRole === 'admin' ? 'Demote to Customer' : 'Promote to Admin'}</span>
                  </button>

                  {handleDeleteUser && (
                    <button
                      onClick={() => handleDeleteUser(uId)}
                      className="p-2 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white border border-red-900/40 transition-all shrink-0"
                      title="Delete User Account"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

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
                currentRole === 'admin' 
                  ? 'bg-[#C28E58]/20 text-[#C28E58] border border-[#C28E58]/40' 
                  : 'bg-stone-800 text-stone-300 border border-stone-700'
              }`}>
                {currentRole === 'admin' ? 'ADMINISTRATOR' : 'CUSTOMER'}
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
