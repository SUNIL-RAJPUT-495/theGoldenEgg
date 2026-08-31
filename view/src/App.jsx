import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext";
import { Navbar } from "./comonents/Navbar";
import { Footer } from "./comonents/Footer";

// Storefront Page Imports
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./pages/Auth";
import { AdminLogin } from "./pages/AdminLogin";
import { Contact } from "./pages/Contact";

// Admin Layout & Individual Router Pages
import { AdminLayout } from "./comonents/admin/AdminLayout";
import { AdminOverviewPage } from "./pages/admin/AdminOverviewPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminPaymentsPage } from "./pages/admin/AdminPaymentsPage";
import { AdminInquiriesPage } from "./pages/admin/AdminInquiriesPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminMarketingPage } from "./pages/admin/AdminMarketingPage";

// --- Protected Route Component for Admin Access ---
function AdminProtectedRoute({ children }) {
  const { user, token } = useContext(AppContext);

  if (token && user?.role === 'admin') {
    return children;
  }

  return <Navigate to="/admin/login" replace />;
}

// --- Protected Route Component for User Dashboard ---
function CustomerProtectedRoute({ children }) {
  const { token } = useContext(AppContext);

  if (token) {
    return children;
  }

  return <Navigate to="/auth" replace />;
}

function MainLayout() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  if (isAdminPath) {
    return (
      <div className="min-h-screen bg-stone-950 font-sans text-stone-100">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminOverviewPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="marketing" element={<AdminMarketingPage />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/dashboard"
            element={
              <CustomerProtectedRoute>
                <Dashboard />
              </CustomerProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;