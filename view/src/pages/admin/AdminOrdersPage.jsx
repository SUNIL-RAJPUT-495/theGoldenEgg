import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AdminOrdersTab } from '../../comonents/admin/AdminOrdersTab';

export const AdminOrdersPage = () => {
  const ctx = useOutletContext();

  return (
    <AdminOrdersTab
      ordersList={ctx.ordersList}
      searchTerm={ctx.searchTerm}
      setSearchTerm={ctx.setSearchTerm}
      statusFilter={ctx.statusFilter}
      setStatusFilter={ctx.setStatusFilter}
      handleUpdateOrderStatus={ctx.handleUpdateOrderStatus}
      setSelectedOrder={ctx.setSelectedOrder}
    />
  );
};

export default AdminOrdersPage;
