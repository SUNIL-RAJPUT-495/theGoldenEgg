import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, CreditCard, MessageSquare, 
  Users, Tag, ExternalLink, LogOut, X, Menu, ShieldCheck 
} from 'lucide-react';

export const AdminSidebar = ({ 
  user, 
  logout, 
  mobileOpen,
  setMobileOpen,
  unreadInquiriesCount = 0,
  pendingOrdersCount = 0
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products & Inventory', icon: ShoppingBag },
    { path: '/admin/orders', label: 'Orders Management', icon: ShoppingCart, badge: pendingOrdersCount },
    { path: '/admin/payments', label: 'Payment Records', icon: CreditCard },
    { path: '/admin/inquiries', label: 'Customer Inquiries', icon: MessageSquare, badge: unreadInquiriesCount },
    { path: '/admin/users', label: 'User Database', icon: Users },
    { path: '/admin/marketing', label: 'Coupons & Banners', icon: Tag },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-stone-900 border-b border-stone-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="p-2 rounded-xl bg-stone-800 text-stone-200 hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div>
            <span className="font-serif font-black text-white text-base">The Golden Egg</span>
            <span className="text-[10px] text-[#C28E58] font-bold block uppercase tracking-wider">Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white text-xs flex items-center space-x-1"
            title="View Live Storefront"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Mobile Overlay Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40" 
        />
      )}

      {/* Sidebar (Desktop Persistent & Mobile Slide-Out) */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-72 bg-stone-900 border-r border-stone-800 
        flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out shrink-0
        ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Header Brand */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-5">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#C28E58] to-stone-800 p-0.5 shadow-lg flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-stone-950" />
              </div>
              <div>
                <h1 className="font-serif font-black text-white text-lg tracking-tight leading-tight">
                  The Golden Egg
                </h1>
                <span className="text-[10px] text-[#C28E58] font-bold uppercase tracking-widest block">
                  Admin Control Panel
                </span>
              </div>
            </div>
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-stone-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Router Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C28E58] text-stone-950 shadow-lg shadow-[#C28E58]/20 scale-[1.02]'
                      : 'text-stone-400 hover:bg-stone-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {Boolean(item.badge) && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-stone-950 text-[#C28E58]' : 'bg-[#C28E58] text-stone-950'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User Info */}
        <div className="pt-4 border-t border-stone-800 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950 border border-stone-800">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="h-9 w-9 rounded-xl bg-stone-800 flex items-center justify-center text-white font-bold text-xs shrink-0 border border-stone-700">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="truncate">
                <p className="font-bold text-white text-xs truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-stone-400 truncate">{user?.email || 'admin@thegoldenegg.co.in'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-[11px] font-bold transition-all flex items-center justify-center space-x-1.5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Site</span>
            </a>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="py-2.5 px-3 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 text-[11px] font-bold transition-all flex items-center justify-center space-x-1.5 border border-red-900/50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
