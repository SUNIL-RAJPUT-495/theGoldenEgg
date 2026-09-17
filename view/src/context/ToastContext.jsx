import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContext = createContext(null);

// Singleton listener for non-react modules (like api.js interceptors)
let toastEmitter = null;

export const showToast = (message, type = 'info', title = null, duration = 4000) => {
  if (toastEmitter) {
    toastEmitter({ message, type, title, duration });
  } else {
    console.log(`[Toast ${type.toUpperCase()}]:`, message);
  }
};

export const toast = {
  success: (msg, title, duration) => showToast(msg, 'success', title || 'Success', duration),
  error: (msg, title, duration) => showToast(msg, 'error', title || 'Error', duration),
  info: (msg, title, duration) => showToast(msg, 'info', title || 'Info', duration),
  warning: (msg, title, duration) => showToast(msg, 'warning', title || 'Warning', duration),
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ message, type = 'info', title = null, duration = 4000 }) => {
    if (!message) return;
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => [
      ...prev,
      { id, message, type, title, duration }
    ]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  useEffect(() => {
    toastEmitter = addToast;
    return () => {
      toastEmitter = null;
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return { toast, addToast: showToast, removeToast: () => {} };
  }
  return ctx;
};

// Internal Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0 transition-all"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => onRemove(t.id)} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const { type, message, title } = toast;

  const config = {
    success: {
      border: 'border-emerald-500/40 dark:border-emerald-500/30',
      bg: 'bg-emerald-950/90 dark:bg-stone-900/95',
      badge: 'bg-emerald-500/20 text-emerald-400',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />,
      accent: 'bg-emerald-500',
      defaultTitle: 'Success'
    },
    error: {
      border: 'border-rose-500/40 dark:border-rose-500/30',
      bg: 'bg-rose-950/90 dark:bg-stone-900/95',
      badge: 'bg-rose-500/20 text-rose-400',
      icon: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />,
      accent: 'bg-rose-500',
      defaultTitle: 'Failed'
    },
    warning: {
      border: 'border-amber-500/40 dark:border-amber-500/30',
      bg: 'bg-amber-950/90 dark:bg-stone-900/95',
      badge: 'bg-amber-500/20 text-amber-400',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />,
      accent: 'bg-amber-500',
      defaultTitle: 'Notice'
    },
    info: {
      border: 'border-[#C28E58]/40 dark:border-[#C28E58]/30',
      bg: 'bg-stone-900/95',
      badge: 'bg-[#C28E58]/20 text-[#E6C387]',
      icon: <Info className="w-5 h-5 text-[#C28E58] flex-shrink-0 mt-0.5" />,
      accent: 'bg-[#C28E58]',
      defaultTitle: 'Update'
    }
  }[type] || {
    border: 'border-stone-700',
    bg: 'bg-stone-900',
    badge: 'bg-stone-800 text-stone-300',
    icon: <Info className="w-5 h-5 text-stone-400 flex-shrink-0" />,
    accent: 'bg-stone-500',
    defaultTitle: 'Notification'
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${config.bg} ${config.border} text-white transition-all transform animate-in slide-in-from-top-3 fade-in duration-300 relative overflow-hidden`}
      role="alert"
    >
      {/* Top/Side Accent Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.accent}`} />
      
      {/* Icon */}
      <div className="pl-1">
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">
          {title || config.defaultTitle}
        </div>
        <p className="text-sm font-medium text-stone-200 leading-snug break-words">
          {typeof message === 'object' ? JSON.stringify(message) : String(message)}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 -mr-1"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
