import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import { Navbar } from "./comonents/Navbar";
import { Footer } from "./comonents/Footer";
import { ScrollToTop } from "./comonents/ScrollToTop";

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
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { ShippingPolicy } from "./pages/ShippingPolicy";
import { Founders } from "./pages/Founders";

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
  const { user, token, adminUser, adminToken } = useContext(AppContext);

  const effectiveAdminToken = adminToken || (user?.role === 'admin' ? token : null);
  const effectiveAdminUser = adminUser || (user?.role === 'admin' ? user : null);

  if (effectiveAdminToken && effectiveAdminUser?.role === 'admin') {
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
      <div className="h-screen w-full bg-stone-950 font-sans text-stone-100 overflow-hidden flex flex-col">
        <ScrollToTop />
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
      <ScrollToTop />
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
          <Route path="/auth/*" element={<Navigate to="/auth" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/about" element={<Founders />} />

          {/* Legal & Policy Routes */}
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/refund-and-cancellation" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/shipping" element={<ShippingPolicy />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ToastProvider>
  );
}

export default App;