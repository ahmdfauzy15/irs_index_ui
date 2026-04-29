// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationPopup from './NotificationPopup';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupMessage, setPopupMessage] = React.useState('');

  useEffect(() => {
    // Check for logout message from session expiration
    const message = sessionStorage.getItem('logout_message');
    if (message && !isAuthenticated) {
      setPopupMessage(message);
      setShowPopup(true);
      sessionStorage.removeItem('logout_message');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        {showPopup && (
          <NotificationPopup
            type="warning"
            message={popupMessage}
            onClose={() => setShowPopup(false)}
          />
        )}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-red-50 to-white">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sesi Berakhir</h2>
            <p className="text-gray-600 mb-6">Silakan login kembali untuk melanjutkan.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Kembali ke Halaman Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;