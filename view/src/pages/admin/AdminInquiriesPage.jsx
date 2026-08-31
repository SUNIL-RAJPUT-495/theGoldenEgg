import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AdminInquiriesTab } from '../../comonents/admin/AdminInquiriesTab';

export const AdminInquiriesPage = () => {
  const ctx = useOutletContext();

  return (
    <AdminInquiriesTab
      inquiriesList={ctx.inquiriesList}
      searchTerm={ctx.searchTerm}
      setSearchTerm={ctx.setSearchTerm}
      statusFilter={ctx.statusFilter}
      setStatusFilter={ctx.setStatusFilter}
      setSelectedInquiry={ctx.setSelectedInquiry}
      setReplyNote={ctx.setReplyNote}
      handleDeleteInquiry={ctx.handleDeleteInquiry}
    />
  );
};

export default AdminInquiriesPage;
