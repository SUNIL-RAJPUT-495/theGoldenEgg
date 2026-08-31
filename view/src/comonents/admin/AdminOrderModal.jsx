import React from 'react';
import { X, MapPin, ShoppingBag } from 'lucide-react';

export const AdminOrderModal = ({ selectedOrder, setSelectedOrder }) => {
  if (!selectedOrder) return null;

  const oId = selectedOrder._id || selectedOrder.id;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-lg rounded-3xl p-5 sm:p-6 space-y-6 shadow-2xl my-auto">
        
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white">Order Details</h3>
            <p className="text-[11px] font-mono text-stone-400">ID: #{oId}</p>
          </div>
          <button 
            onClick={() => setSelectedOrder(null)} 
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* Shipping Address */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
            <div className="flex items-center space-x-2 text-[#C28E58] font-bold text-[11px] uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5" />
              <span>Shipping Address</span>
            </div>
            <p className="font-bold text-white text-sm pt-1">{selectedOrder.shippingAddress?.name || selectedOrder.userName}</p>
            <p className="text-stone-300 leading-relaxed">
              {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
            </p>
            <p className="text-stone-400 font-mono pt-1">Phone: {selectedOrder.shippingAddress?.phone || 'N/A'}</p>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-stone-300 font-bold">
              <ShoppingBag className="h-3.5 w-3.5 text-[#C28E58]" />
              <span>Items Ordered ({selectedOrder.items?.length || 0}):</span>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-[10px] text-stone-400">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-bold text-emerald-400">₹{item.quantity * item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Total Amount */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400">Payment Mode:</span>
              <span className="font-bold text-white">{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span>
            </div>
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-sm font-bold">
              <span className="text-stone-300">Total Amount Paid:</span>
              <span className="text-emerald-400 text-base">₹{selectedOrder.finalPrice}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
