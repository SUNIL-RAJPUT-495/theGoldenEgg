import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext";
import { Navbar } from "./comonents/Navbar";
import { Footer } from "./comonents/Footer";

// Page Imports
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./pages/Auth";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminLogin } from "./pages/AdminLogin";
import { Contact } from "./pages/Contact";

// --- Protected Route Component for Admin Access ---
function AdminProtectedRoute({ children }) {
  const { user, token } = useContext(AppContext);

  // If authenticated and is admin, grant access
  if (token && user?.role === 'admin') {
    return children;
  }

  // Otherwise redirect to Admin Login page
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
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
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