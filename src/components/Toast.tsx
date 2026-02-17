import { ToastType } from '@/types';
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-emerald-500 border-emerald-600',
    error: 'bg-rose-500 border-rose-600',
    warning: 'bg-amber-500 border-amber-600',
    info: 'bg-primary-500 border-primary-600',
  };

  const icons = {
    success: 'check-circle',
    error: 'exclamation-triangle',
    warning: 'exclamation-circle',
    info: 'info-circle',
  };

  return (
    <div
      className={`${colors[type]} border-l-4 text-white px-5 py-3.5 rounded-lg shadow-lg 
                  font-medium flex items-center gap-3 min-w-[300px] animate-slideUp`}
    >
      <div className="flex-shrink-0">
        <i className={`fas fa-${icons[type]} text-lg`}></i>
      </div>
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-white hover:bg-opacity-20 rounded p-1 transition"
        aria-label="Close"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-8 right-8 space-y-3 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => onRemove(toast.id)} />
      ))}
    </div>
  );
};

export default Toast;
