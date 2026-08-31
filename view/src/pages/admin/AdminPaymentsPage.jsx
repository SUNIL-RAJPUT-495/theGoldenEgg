import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AdminPaymentsTab } from '../../comonents/admin/AdminPaymentsTab';

export const AdminPaymentsPage = () => {
  const ctx = useOutletContext();

  return <AdminPaymentsTab paymentsList={ctx.paymentsList} />;
};

export default AdminPaymentsPage;
