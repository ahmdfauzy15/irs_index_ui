// src/components/SessionManager.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, RefreshCw, LogOut } from 'lucide-react';

const SessionManager = () => {
  const { getRemainingTime, extendSession, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingTime();
      setTimeLeft(remaining);
      
      // Show warning when 5 minutes remaining
      if (remaining <= 5 * 60 * 1000 && remaining > 0 && !showWarning) {
        setShowWarning(true);
      }
      
      // Auto hide warning when more than 5 minutes
      if (remaining > 5 * 60 * 1000 && showWarning) {
        setShowWarning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingTime, showWarning]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleExtend = () => {
    extendSession();
    setShowWarning(false);
    setTimeLeft(getRemainingTime());
  };

  const percentage = (timeLeft / (30 * 60 * 1000)) * 100;

  return (
    <>
      {/* Session Timer Badge */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          <div className={`
            bg-white rounded-full shadow-lg border
            transition-all duration-300
            ${timeLeft < 5 * 60 * 1000 && timeLeft > 0 
              ? 'border-red-500 animate-pulse' 
              : 'border-gray-200'
            }
          `}>
            <div className="flex items-center space-x-2 px-4 py-2">
              <div className="relative">
                <Clock className={`w-4 h-4 ${timeLeft < 5 * 60 * 1000 && timeLeft > 0 ? 'text-red-500' : 'text-gray-600'}`} />
                {/* Progress ring */}
                <svg className="absolute top-0 left-0 w-4 h-4 -rotate-90">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${(percentage / 100) * 37.7} 37.7`}
                    className="text-red-500"
                  />
                </svg>
              </div>
              <span className={`text-sm font-mono font-medium ${
                timeLeft < 5 * 60 * 1000 && timeLeft > 0 ? 'text-red-500' : 'text-gray-700'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
              Sesi akan berakhir dalam {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Session Warning Modal */}
      {showWarning && timeLeft <= 5 * 60 * 1000 && timeLeft > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => {}}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up">
            <div className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Sesi Akan Berakhir</h3>
                  <p className="text-sm text-gray-500">Sesi Anda akan berakhir dalam {formatTime(timeLeft)}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Apakah Anda ingin memperpanjang sesi login Anda? Klik "Perpanjang Sesi" untuk melanjutkan.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleExtend}
                  className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Perpanjang Sesi</span>
                </button>
                <button
                  onClick={() => logout()}
                  className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionManager;