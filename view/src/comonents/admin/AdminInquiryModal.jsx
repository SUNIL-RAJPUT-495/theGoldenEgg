import React from 'react';
import { X, Send } from 'lucide-react';

export const AdminInquiryModal = ({
  selectedInquiry,
  setSelectedInquiry,
  replyNote,
  setReplyNote,
  handleUpdateInquiryStatus
}) => {
  if (!selectedInquiry) return null;

  const inqId = selectedInquiry._id || selectedInquiry.id;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-3xl p-5 sm:p-6 space-y-6 shadow-2xl my-auto">
        
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-base font-serif font-bold text-white">Update Inquiry</h3>
            <p className="text-[10px] text-stone-400">From: {selectedInquiry.name} ({selectedInquiry.email})</p>
          </div>
          <button 
            onClick={() => setSelectedInquiry(null)} 
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
            <p className="font-bold text-[#C28E58]">{selectedInquiry.subject}</p>
            <p className="text-stone-300 leading-relaxed italic pt-1">"{selectedInquiry.message}"</p>
          </div>

          <div>
            <label className="block text-stone-300 font-bold mb-1">Status</label>
            <select
              value={selectedInquiry.status || 'New'}
              onChange={(e) => setSelectedInquiry({ ...selectedInquiry, status: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-stone-300 font-bold mb-1">Internal Reply / Note</label>
            <textarea
              rows={3}
              placeholder="Write response note or internal action taken..."
              value={replyNote}
              onChange={(e) => setReplyNote(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#C28E58]"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedInquiry(null)}
              className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 font-bold text-xs hover:bg-stone-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleUpdateInquiryStatus(inqId, selectedInquiry.status, replyNote)}
              className="px-6 py-2.5 rounded-xl bg-[#C28E58] text-stone-950 font-bold text-xs hover:bg-[#b07e4a] transition-all shadow-md flex items-center space-x-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Save Response</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
