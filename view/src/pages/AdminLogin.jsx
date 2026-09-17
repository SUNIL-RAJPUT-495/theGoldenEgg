import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cleanEmail = email.trim();
      const data = await adminLogin(cleanEmail, password);
      if (data && data.success) {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.message || err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C28E58]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-stone-900/90 border border-stone-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl backdrop-blur-xl relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C28E58] to-[#E6C387] mx-auto flex items-center justify-center font-bold text-stone-950 text-2xl shadow-xl shadow-[#C28E58]/20">
            👑
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              The Golden Egg
            </h1>
            <p className="text-xs text-[#C28E58] font-bold uppercase tracking-widest pt-1">
              Food Forest Administrator
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 flex items-center space-x-3 text-red-400 text-xs animate-shake">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-5">
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
              <input
                type="email"
                required
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 pl-10 pr-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-[#C28E58] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Master Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
              <input
                type="password"
                required
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 pl-10 pr-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-[#C28E58] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C28E58] to-[#b07e4a] text-stone-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-[#C28E58]/20 flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating Admin...</span>
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;
