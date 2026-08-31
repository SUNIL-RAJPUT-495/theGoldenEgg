import React, { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Key, Mail, Lock, User, Phone, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import axios from 'axios';

export const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { login, signup, verifyOtp, API_URL } = useContext(AppContext);

  // Modes: login, signup, forgot, otp
  const [authMode, setAuthMode] = useState('login');

  // Input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Password reset specific
  const [newPassword, setNewPassword] = useState('');

  // Errors / Successes
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const data = await login(email, password);
      if (data.success) {
        navigate(redirect);
      }
    } catch (err) {
      if (err.notVerified) {
        setSuccessMsg('Account registration detected. Complete email OTP verification.');
        setAuthMode('otp');
      } else {
        setErrorMsg(err.message || 'Login credentials incorrect');
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const data = await signup(name, email, password, phone);
      if (data.success) {
        setSuccessMsg('Registration successful! Please check terminal console for generated OTP code.');
        setAuthMode('otp');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Signup failed. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const data = await verifyOtp(email, otpCode);
      if (data.success) {
        setSuccessMsg('OTP verified successfully!');
        setTimeout(() => navigate(redirect), 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Incorrect OTP code entered');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const { data } = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      if (data.success) {
        setSuccessMsg('Reset code sent! Check terminal console.');
        setAuthMode('reset');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Email address not found');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const { data } = await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        otp: otpCode,
        newPassword
      });
      if (data.success) {
        setSuccessMsg('Password updated! Redirecting to login...');
        setOtpCode('');
        setNewPassword('');
        setTimeout(() => {
          setSuccessMsg('');
          setAuthMode('login');
        }, 1500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="glass-card p-8 rounded-3xl space-y-6">
        
        {/* Headers */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-stone-900 dark:text-white">
            {authMode === 'login' && 'Sign In'}
            {authMode === 'signup' && 'Create Account'}
            {authMode === 'forgot' && 'Forgot Password'}
            {authMode === 'otp' && 'Email Verification'}
            {authMode === 'reset' && 'Reset Password'}
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            {authMode === 'login' && 'Access your orders, tracking timeline, and wishlist.'}
            {authMode === 'signup' && <span>Join <b>The Golden Egg</b> for organic superfoods.</span>}
            {authMode === 'forgot' && 'Retrieve your account credentials.'}
            {authMode === 'otp' && 'Verify your email to complete registration.'}
            {authMode === 'reset' && 'Enter reset OTP and create a new secure password.'}
          </p>
        </div>

        {/* Global Messages */}
        {errorMsg && (
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-3 rounded-xl text-xs text-red-650 dark:text-red-400 font-bold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-start space-x-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 rounded-xl text-xs text-green-700 dark:text-green-300 font-bold">
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form elements */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@thegoldenegg.com"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-500">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="text-xs text-organic-green-700 font-semibold hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold py-3 rounded-full flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-stone-400">
              New customer?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="text-organic-green-700 font-bold hover:underline"
              >
                Create an account
              </button>
            </p>
          </form>
        )}

        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ramesh Kumar"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh@gmail.com"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 7411932830"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold py-3 rounded-full"
            >
              Register Account
            </button>

            <p className="text-center text-xs text-stone-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-organic-green-700 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {authMode === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="p-3 bg-organic-gold-50 dark:bg-organic-gold-950/20 border border-organic-gold-200 dark:border-organic-gold-900 rounded-xl text-[10px] text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
              💡 <strong>Local Testing Shortcut:</strong> We simulated emailing the OTP code. Check your backend terminal log to see the generated number, or enter <strong>123456</strong> for instant developer bypass!
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">6-Digit Verification Code</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full bg-stone-50 dark:bg-stone-900 text-center tracking-widest font-mono text-lg p-2.5 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold py-3 rounded-full"
            >
              Verify OTP Code
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setAuthMode('login');
              }}
              className="w-full text-center text-xs text-stone-400 font-semibold hover:underline"
            >
              Back to Sign In
            </button>
          </form>
        )}

        {authMode === 'forgot' && (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@thegoldenegg.com"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold py-3 rounded-full"
            >
              Send Reset Code
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="w-full text-center text-xs text-stone-400 font-semibold hover:underline"
            >
              Back to Sign In
            </button>
          </form>
        )}

        {authMode === 'reset' && (
          <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
            <div className="p-3 bg-organic-gold-50 border border-organic-gold-250 rounded-xl text-[10px] text-stone-600 font-medium">
              💡 <strong>Local Testing:</strong> Check the backend terminal console for the generated forgot OTP reset code, or enter <strong>123456</strong>.
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">6-Digit Reset OTP Code</label>
              <input
                type="text"
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full bg-stone-50 dark:bg-stone-900 text-center tracking-widest font-mono text-base p-2.5 border rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 dark:bg-stone-900 p-2.5 border rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-organic-green-700 hover:bg-organic-green-800 text-white font-bold py-3 rounded-full"
            >
              Set New Password
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
export default Auth;
