import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { AdminProductsTab } from '../../comonents/admin/AdminProductsTab';

export const AdminProductsPage = () => {
  const ctx = useOutletContext();

  return (
    <AdminProductsTab
      productsList={ctx.productsList}
      searchTerm={ctx.searchTerm}
      setSearchTerm={ctx.setSearchTerm}
      stockFilter={ctx.stockFilter}
      setStockFilter={ctx.setStockFilter}
      handleOpenProductModal={ctx.handleOpenProductModal}
      handleDeleteProduct={ctx.handleDeleteProduct}
      handleQuickStockUpdate={ctx.handleQuickStockUpdate}
    />
  );
};

export default AdminProductsPage;
