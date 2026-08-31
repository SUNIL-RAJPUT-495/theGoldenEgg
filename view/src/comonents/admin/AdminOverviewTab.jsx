import React from 'react';
import { DollarSign, ShoppingCart, ShoppingBag, Users, ArrowUpRight, ChevronRight, Eye } from 'lucide-react';

export const AdminOverviewTab = ({ 
  stats, 
  ordersList, 
  setActiveTab, 
  setSelectedOrder 
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Title & Quick Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Real-time analytics, revenue metrics and food forest operations
          </p>
        </div>
        <button
          onClick={() => setActiveTab('products')}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow-md"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Manage Products</span>
        </button>
      </div>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Total Revenue */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
              Live Total
            </span>
          </div>
          <div>
            <p className="text-xs text-stone-400 font-bold">Total Revenue</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
              ₹{stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}
            </h3>
          </div>
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span>Completed Payments</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-[#C28E58]/10 text-[#C28E58] border border-[#C28E58]/20">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C28E58] bg-[#C28E58]/10 px-2.5 py-1 rounded-full border border-[#C28E58]/30">
              {stats?.pendingOrders || 0} Pending
            </span>
          </div>
          <div>
            <p className="text-xs text-stone-400 font-bold">Total Orders Placed</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
              {stats?.totalOrders || 0}
            </h3>
          </div>
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span>Customer Checkout Orders</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#C28E58]" />
          </div>
        </div>

        {/* Card 3: Active Products */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/40">
              Inventory
            </span>
          </div>
          <div>
            <p className="text-xs text-stone-400 font-bold">Products in Store</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
              {stats?.totalProducts || 0}
            </h3>
          </div>
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span>Active Organic Catalog</span>
            <ChevronRight className="h-3.5 w-3.5 text-amber-400" />
          </div>
        </div>

        {/* Card 4: Registered Users */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-800/40">
              Customers
            </span>
          </div>
          <div>
            <p className="text-xs text-stone-400 font-bold">Registered Users</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
              {stats?.totalUsers || 0}
            </h3>
          </div>
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span>Verified Customer Accounts</span>
            <ChevronRight className="h-3.5 w-3.5 text-blue-400" />
          </div>
        </div>

      </div>

      {/* Recent Orders Overview Table */}
      <div className="space-y-4 pt-4 border-t border-stone-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-white">Recent Customer Orders</h3>
            <p className="text-xs text-stone-400">Latest orders placed on The Golden Egg store</p>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs font-bold text-[#C28E58] hover:underline flex items-center space-x-1"
          >
            <span>View All Orders</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                {ordersList.slice(0, 5).map(order => (
                  <tr key={order._id || order.id} className="hover:bg-stone-800/40 transition-all">
                    <td className="p-4 font-mono text-[11px] text-stone-400">#{order._id || order.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-white">{order.shippingAddress?.name || order.userName || 'Customer'}</p>
                      <p className="text-[10px] text-stone-400">{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                    </td>
                    <td className="p-4 font-bold text-emerald-400">₹{order.finalPrice}</td>
                    <td className="p-4">
                      <span className="font-semibold text-stone-300">{order.paymentMethod}</span>
                      <span className={`block text-[10px] font-bold ${
                        order.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-800 text-[#C28E58] border border-stone-700">
                        {order.deliveryStatus || 'Placed'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-all"
                        title="View Order Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {ordersList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-stone-500">
                      No orders placed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
