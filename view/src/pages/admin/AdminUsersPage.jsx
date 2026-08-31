import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AdminUsersTab } from '../../comonents/admin/AdminUsersTab';

export const AdminUsersPage = () => {
  const ctx = useOutletContext();

  return (
    <AdminUsersTab
      usersList={ctx.usersList}
      searchTerm={ctx.searchTerm}
      setSearchTerm={ctx.setSearchTerm}
      handleToggleUserRole={ctx.handleToggleUserRole}
    />
  );
};

export default AdminUsersPage;
