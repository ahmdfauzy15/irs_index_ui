// src/components/NotificationPopup.jsx
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const NotificationPopup = ({ type, message, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
      borderColor: 'border-green-300',
      textColor: 'text-white',
      title: 'Berhasil!'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
      borderColor: 'border-red-300',
      textColor: 'text-white',
      title: 'Gagal!'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      borderColor: 'border-yellow-300',
      textColor: 'text-white',
      title: 'Peringatan'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, title } = config[type];

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
      <div className={`
        relative overflow-hidden rounded-xl shadow-2xl
        ${bgColor} ${borderColor} border
        transform transition-all duration-300
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/30">
          <div 
            className="h-full bg-white rounded-r-full animate-progress-shrink"
            style={{ animationDuration: `${duration}ms` }}
          ></div>
        </div>

        <div className="p-4 min-w-[320px] max-w-md">
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-bold ${textColor}`}>{title}</h4>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className={`text-sm mt-1 ${textColor} opacity-90`}>{message}</p>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

export default NotificationPopup;