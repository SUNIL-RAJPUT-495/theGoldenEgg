import React from 'react';

export const AdminPaymentsTab = ({ paymentsList }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Payment Records
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          All financial transaction logs and checkout payment methods
        </p>
      </div>

      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300">
              {paymentsList.map(pay => (
                <tr key={pay._id || pay.id} className="hover:bg-stone-800/40 transition-all">
                  <td className="p-4 font-mono text-[11px] text-stone-400">#{pay.transactionId || pay._id}</td>
                  <td className="p-4 font-mono text-[11px] text-stone-400">#{pay.orderId}</td>
                  <td className="p-4 font-bold text-white">{pay.userName || 'Customer'}</td>
                  <td className="p-4">
                    <span className="font-semibold text-stone-300">{pay.paymentMethod || 'COD'}</span>
                  </td>
                  <td className="p-4 font-bold text-emerald-400 text-sm">₹{pay.amount}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      pay.status === 'Completed' || pay.status === 'Success' 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {pay.status || 'Success'}
                    </span>
                  </td>
                </tr>
              ))}

              {paymentsList.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    No payment logs recorded yet.
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
