import React from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';

export const AdminInquiriesTab = ({
  inquiriesList,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  setSelectedInquiry,
  setReplyNote,
  handleDeleteInquiry
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Customer Inquiries
        </h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Messages and inquiries sent from the website Contact page
        </p>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by customer name, email, subject..."
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
            <option value="All">All Inquiries</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-stone-950 text-stone-400 font-bold border-b border-stone-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer Info</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300">
              {inquiriesList
                .filter(inq => {
                  const s = searchTerm.toLowerCase();
                  const matchSearch = (inq.name || '').toLowerCase().includes(s) ||
                                      (inq.email || '').toLowerCase().includes(s) ||
                                      (inq.subject || '').toLowerCase().includes(s);
                  if (!matchSearch) return false;
                  if (statusFilter !== 'All' && inq.status !== statusFilter) return false;
                  return true;
                })
                .map(inq => {
                  const inqId = inq._id || inq.id;
                  return (
                    <tr key={inqId} className="hover:bg-stone-800/40 transition-all">
                      <td className="p-4">
                        <p className="font-bold text-white">{inq.name}</p>
                        <p className="text-[10px] text-stone-400">{inq.email} • {inq.phone || 'No Phone'}</p>
                      </td>
                      <td className="p-4 font-semibold text-[#C28E58]">{inq.subject}</td>
                      <td className="p-4 max-w-xs truncate text-stone-300">{inq.message}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          inq.status === 'Resolved' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : inq.status === 'In Progress'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-stone-800 text-[#C28E58] border border-stone-700'
                        }`}>
                          {inq.status || 'New'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedInquiry(inq);
                              setReplyNote(inq.replyNote || '');
                            }}
                            className="p-2 rounded-xl bg-stone-800 hover:bg-[#C28E58] hover:text-stone-950 text-stone-300 transition-all shadow"
                            title="Update Inquiry Status & Note"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inqId)}
                            className="p-2 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white transition-all border border-red-900/40 shadow"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {inquiriesList.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-stone-500">
                    No customer inquiries found.
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
