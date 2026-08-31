import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { AdminOverviewTab } from '../../comonents/admin/AdminOverviewTab';

export const AdminOverviewPage = () => {
  const ctx = useOutletContext();
  const navigate = useNavigate();

  return (
    <AdminOverviewTab
      stats={ctx.stats}
      ordersList={ctx.ordersList}
      setActiveTab={(tab) => navigate(`/admin/${tab}`)}
      setSelectedOrder={ctx.setSelectedOrder}
    />
  );
};

export default AdminOverviewPage;
