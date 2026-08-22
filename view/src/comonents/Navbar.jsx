import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Heart, Sun, Moon, User, Search, Menu, X, LogOut, Settings } from 'lucide-react';
import logo from "../assets/logo.png";

export const Navbar = () => {
  const { user, cart, wishlist, darkMode, setDarkMode, logout, fetchProducts } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts({ search: searchQuery });
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogoutClick = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="glass-nav sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <img src={logo} alt="Golden Egg" className="h-11 w-auto object-contain" />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search organic ragi, cookies, mixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 pl-10 pr-4 py-2 rounded-full border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-organic-green-600 focus:border-transparent text-sm transition-all"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-stone-400" />
          </form>

          {/* Nav Links & Controls - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-stone-600 dark:text-stone-300 hover:text-organic-green-700 dark:hover:text-organic-green-100 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-stone-600 dark:text-stone-300 hover:text-organic-green-700 dark:hover:text-organic-green-100 font-medium transition-colors">
              Shop Products
            </Link>
            <Link to="/contact" className="text-stone-600 dark:text-stone-300 hover:text-organic-green-700 dark:hover:text-organic-green-100 font-medium transition-colors">
              Contact
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 relative text-stone-500 hover:text-organic-green-700 dark:text-stone-400 dark:hover:text-organic-green-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-organic-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-all focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-organic-green-700 text-white flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-stone-700 dark:text-stone-300 max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                        <p className="text-xs text-stone-400">Signed in as</p>
                        <p className="text-sm font-semibold truncate text-stone-700 dark:text-stone-200">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>My Dashboard</span>
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-organic-gold-600 dark:text-organic-gold-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-medium"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      <hr className="border-stone-100 dark:border-stone-800 my-1" />

                      <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/auth"
                  className="bg-organic-green-700 hover:bg-organic-green-800 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md shadow-organic-green-700/20 hover:shadow-lg transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>

          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="p-2 relative text-stone-500 dark:text-stone-400">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-organic-green-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Toggle Menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-stone-500 dark:text-stone-400 focus:outline-none">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 pl-10 pr-4 py-2 rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-organic-green-600"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-stone-400" />
          </form>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            Shop Products
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            Contact
          </Link>

          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              Dashboard
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-organic-gold-600 dark:text-organic-gold-500 hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              Admin Console
            </Link>
          )}

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  navigate('/');
                }}
                className="w-full bg-red-600 text-white py-2 rounded-full font-semibold flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="block text-center w-full bg-organic-green-700 text-white py-2.5 rounded-full font-semibold shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
