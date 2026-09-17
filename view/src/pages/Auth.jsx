import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Key, Mail, Lock, User, Phone, CheckCircle, ArrowRight, AlertCircle, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { authAPI, toast } from '../services/api.js';

export const Auth = () => {
  const navigate = useNavigate();

  const { login, signup } = useContext(AppContext);

  // Modes: login, signup, forgot
  const [authMode, setAuthMode] = useState('login');

  // Input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Forgot password specific fields
  const [forgotPhone, setForgotPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Errors / Successes
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);
    try {
      const data = await login(email, password);
      if (data.success) {
        toast.success(`Welcome back, ${data.user?.name || 'User'}!`);
        navigate('/');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login credentials incorrect');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMsg('Mobile number must start with 6, 7, 8, or 9 (e.g. 7411932830)');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await signup(name, email, password, cleanPhone);
      if (data.success) {
        toast.success(`Account created successfully! Welcome, ${data.user?.name || name}.`);
        navigate('/');
      }
    } catch (err) {
      setErrorMsg(err.message || err.response?.data?.message || err.error || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Direct Phone Number to Password Change Flow ---
  const handleForgotAndChangePassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanPhone = forgotPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number (e.g. 7411932830)');
      return;
    }

    if (!newPassword) {
      setErrorMsg('Please enter your new password');
      return;
    }

    if (newPassword.length < 4) {
      setErrorMsg('New password must be at least 4 characters long');
      return;
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      setErrorMsg('New password and confirm password do not match');
      return;
    }

    setIsResetting(true);
    try {
      const res = await authAPI.resetPassword({
        phone: cleanPhone,
        identifier: cleanPhone,
        newPassword
      });

      if (res.success) {
        setSuccessMsg('Password changed successfully! Redirecting to Sign In...');
        toast.success('Password changed successfully! You can now sign in with your new password.');
        
        // Reset fields
        setForgotPhone('');
        setNewPassword('');
        setConfirmPassword('');
        
        setTimeout(() => {
          setSuccessMsg('');
          setErrorMsg('');
          setAuthMode('login');
        }, 1500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to change password. Account not found.');
    } finally {
      setIsResetting(false);
    }
  };

  const isPhoneFilled = forgotPhone.replace(/\D/g, '').length === 10;

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20">
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl border border-stone-200 dark:border-stone-800 backdrop-blur-xl">
        
        {/* Headers */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C28E58] to-[#E6C387] mx-auto flex items-center justify-center font-bold text-stone-950 text-xl shadow-lg shadow-[#C28E58]/20">
            {authMode === 'forgot' ? '🔑' : '🍳'}
          </div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-white">
            {authMode === 'login' && 'Sign In'}
            {authMode === 'signup' && 'Create Account'}
            {authMode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {authMode === 'login' && 'Access your orders, tracking timeline, and wishlist.'}
            {authMode === 'signup' && <span>Join <b>The Golden Egg</b> for organic superfoods.</span>}
            {authMode === 'forgot' && 'Enter your 10-digit mobile number to set a new password.'}
          </p>
        </div>

        {/* Global Messages */}
        {errorMsg && (
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 p-3.5 rounded-2xl text-xs text-red-700 dark:text-red-400 font-semibold animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start space-x-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 p-3.5 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 font-semibold animate-in fade-in">
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. Sign In Form */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@thegoldenegg.com"
                  className="w-full bg-stone-50 dark:bg-stone-900/80 pl-10 pr-3.5 py-3 border border-stone-300 dark:border-stone-750 rounded-2xl text-sm text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Password</label>
                <a
                  href="https://wa.me/917411932830?text=Hello%20The%20Golden%20Egg%20Support%2C%20I%20forgot%20my%20password%20and%20need%20help%20to%20reset%20my%20account."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C28E58] hover:text-emerald-500 font-bold hover:underline inline-flex items-center gap-1 transition-colors"
                >
                  <span>Forgot Password?</span>
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-50 dark:bg-stone-900/80 pl-10 pr-10 py-3 border border-stone-300 dark:border-stone-750 rounded-2xl text-sm text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-stone-500 pt-2">
              New customer?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setAuthMode('signup');
                }}
                className="text-[#C28E58] font-bold hover:underline"
              >
                Create an account
              </button>
            </p>
          </form>
        )}

        {/* 2. Sign Up Form (Strict 10-Digit Mobile) */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ramesh Kumar"
                  className="w-full bg-stone-50 dark:bg-stone-900/80 pl-10 pr-3.5 py-3 border border-stone-300 dark:border-stone-750 rounded-2xl text-sm text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@gmail.com"
                  className="w-full bg-stone-50 dark:bg-stone-900/80 pl-10 pr-3.5 py-3 border border-stone-300 dark:border-stone-750 rounded-2xl text-sm text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Mobile Number (10 Digits)</label>
                <span className={`text-[11px] font-semibold ${phone.length === 10 ? 'text-emerald-500' : 'text-stone-400'}`}>
                  {phone.length}/10
                </span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-stone-400 text-xs font-bold pointer-events-none">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="7411932830"
                  className="w-full bg-stone-50 dark:bg-stone-900/80 pl-16 pr-3.5 py-3 border border-stone-300 dark:border-stone-750 rounded-2xl text-sm text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-50 dark:bg-stone-900/80 pl-10 pr-3.5 py-3 border border-stone-300 dark:border-stone-750 rounded-2xl text-sm text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3.5 rounded-full shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.01] cursor-pointer"
            >
              {isSubmitting ? 'Creating Account...' : 'Register & Sign In'}
            </button>

            <p className="text-center text-xs text-stone-500 pt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setAuthMode('login');
                }}
                className="text-[#C28E58] font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {/* 3. Instant 10-Digit Phone Number to Password Change Flow */}
        {authMode === 'forgot' && (
          <form onSubmit={handleForgotAndChangePassword} className="space-y-4">
            {/* Step 1: 10-Digit Phone Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Registered 10-Digit Mobile Number</label>
                <span className={`text-[11px] font-semibold ${isPhoneFilled ? 'text-emerald-500' : 'text-stone-400'}`}>
                  {forgotPhone.length}/10 {isPhoneFilled && '✓'}
                </span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-stone-400 text-xs font-bold pointer-events-none">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit number (e.g. 7411932830)"
                  className="w-full bg-stone-50 dark:bg-stone-900/80 pl-16 pr-3.5 py-3 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                />
              </div>
            </div>

            {/* Step 2: New Password section (Appears when 10 digits are filled) */}
            {isPhoneFilled && (
              <div className="space-y-4 pt-2 border-t border-stone-200/60 dark:border-stone-800/80 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-1.5 text-xs text-[#C28E58] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>10-Digit Mobile Entered! Set Your New Password:</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-400">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-stone-50 dark:bg-stone-900/80 pl-10 pr-10 py-3 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Confirm New Password</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full bg-stone-50 dark:bg-stone-900/80 pl-10 pr-3.5 py-3 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C28E58]"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isResetting || !isPhoneFilled}
              className={`w-full font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 transition-all shadow-lg ${
                isPhoneFilled
                  ? 'bg-gradient-to-r from-[#C28E58] to-[#996515] hover:from-[#b07d47] hover:to-[#8a5a12] text-white shadow-[#C28E58]/20 cursor-pointer hover:scale-[1.01]'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
              }`}
            >
              <span>{isResetting ? 'Updating Password...' : 'Change Password'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setAuthMode('login');
              }}
              className="w-full text-center text-xs text-stone-400 font-semibold hover:underline"
            >
              Back to Sign In
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Auth;
