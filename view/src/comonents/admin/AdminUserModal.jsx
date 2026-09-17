import React, { useState } from 'react';
import { 
  X, Mail, Phone, Shield, DollarSign, ShoppingBag, 
  Ban, ShieldAlert, CheckCircle, AlertTriangle, Trash2,
  Key, Lock, Eye, EyeOff, Sparkles
} from 'lucide-react';

export const AdminUserModal = ({ 
  selectedUser, 
  setSelectedUser, 
  ordersList = [], 
  handleUpdateUserStatus,
  handleUpdateUserPassword,
  handleDeleteUser
}) => {
  if (!selectedUser) return null;

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  const uId = selectedUser._id || selectedUser.id;
  const uEmail = (selectedUser.email || '').toLowerCase();
  const uPhone = (selectedUser.phone || '').trim();
  const currentStatus = selectedUser.status || 'Active';
  const currentRole = selectedUser.role || 'customer';

  const onPasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (!newPassword || newPassword.trim().length < 4) {
      setPassError('New password must be at least 4 characters long');
      return;
    }

    setIsChangingPass(true);
    try {
      if (handleUpdateUserPassword) {
        await handleUpdateUserPassword(uId, newPassword.trim());
        setPassSuccess('Password updated successfully!');
        setNewPassword('');
        setTimeout(() => setPassSuccess(''), 4000);
      }
    } catch (err) {
      setPassError(err.response?.data?.message || err.message || 'Failed to update password');
    } finally {
      setIsChangingPass(false);
    }
  };

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
          
          {/* Admin Control Panel: Block / Suspend / Unblock & Delete Account */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4 text-[#C28E58]" />
                <span>Account Access Status</span>
              </h4>
              {handleDeleteUser && (
                <button
                  onClick={() => handleDeleteUser(uId)}
                  className="py-1.5 px-3 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white border border-red-900/40 transition-all text-[11px] font-bold inline-flex items-center space-x-1 cursor-pointer"
                  title="Delete User Account"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete User</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={() => handleUpdateUserStatus(uId, 'Active')}
                className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center space-x-1.5 border cursor-pointer ${
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
                className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center space-x-1.5 border cursor-pointer ${
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
                className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center space-x-1.5 border cursor-pointer ${
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

          {/* Admin Change Password Section */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                <Key className="h-4 w-4 text-[#C28E58]" />
                <span>Reset User Password</span>
              </h4>
              <span className="text-[10px] text-stone-500 font-mono">Min 4 characters</span>
            </div>

            {passSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{passSuccess}</span>
              </div>
            )}

            {passError && (
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center space-x-2 animate-fadeIn">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={onPasswordChangeSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full bg-stone-900 border border-stone-800 pl-10 pr-10 py-2.5 rounded-xl text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#C28E58] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isChangingPass || !newPassword}
                className={`py-2.5 px-5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shrink-0 shadow ${
                  newPassword
                    ? 'bg-gradient-to-r from-[#C28E58] to-[#996515] hover:from-[#b07d47] hover:to-[#8a5a12] text-white cursor-pointer hover:scale-[1.02]'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                }`}
              >
                <Key className="h-3.5 w-3.5" />
                <span>{isChangingPass ? 'Updating...' : 'Set Password'}</span>
              </button>
            </form>
          </div>

          {/* User Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
