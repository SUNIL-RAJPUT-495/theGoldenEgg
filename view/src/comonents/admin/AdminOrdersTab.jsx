import React from 'react';
import { Search, Eye } from 'lucide-react';

export const AdminOrdersTab = ({
  ordersList,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleUpdateOrderStatus,
  setSelectedOrder
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Orders Management
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Track customer checkout orders, delivery statuses and shipping addresses
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by customer name, order ID, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 pl-10 pr-4 py-2 rounded-xl text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#C28E58]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-stone-400 font-bold shrink-0">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-stone-950 border border-stone-800 px-3 py-2 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-[#C28E58]"
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

      {/* Orders Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment Mode</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300">
              {ordersList
                .filter(o => {
                  const s = searchTerm.toLowerCase();
                  const matchSearch = (o._id || o.id || '').toLowerCase().includes(s) ||
                                      (o.shippingAddress?.name || o.userName || '').toLowerCase().includes(s) ||
                                      (o.shippingAddress?.phone || '').includes(s);
                  if (!matchSearch) return false;
                  if (statusFilter !== 'All' && o.deliveryStatus !== statusFilter) return false;
                  return true;
                })
                .map(order => {
                  const oId = order._id || order.id;
                  return (
                    <tr key={oId} className="hover:bg-stone-800/40 transition-all">
                      <td className="p-4 font-mono text-[11px] text-stone-400">#{oId}</td>
                      <td className="p-4">
                        <p className="font-bold text-white">{order.shippingAddress?.name || order.userName || 'Customer'}</p>
                        <p className="text-[10px] text-stone-400">{order.shippingAddress?.phone || 'No phone'}</p>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-stone-300">{order.paymentMethod}</span>
                        <span className={`block text-[10px] font-bold ${
                          order.paymentStatus === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-emerald-400 text-sm">₹{order.finalPrice}</td>
                      
                      {/* Delivery Status Dropdown */}
                      <td className="p-4">
                        <select
                          value={order.deliveryStatus || 'Placed'}
                          onChange={(e) => handleUpdateOrderStatus(oId, e.target.value, order.paymentStatus)}
                          className="bg-stone-950 border border-stone-800 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#C28E58] focus:outline-none focus:border-[#C28E58]"
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
                          className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all flex items-center space-x-1 ml-auto"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {ordersList.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    No orders matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
