// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Check existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem('irs_session');
      
      if (sessionData) {
        try {
          const { expiresAt, userData } = JSON.parse(sessionData);
          const now = Date.now();
          
          if (now < expiresAt) {
            // Session is valid
            setIsAuthenticated(true);
            setCurrentUser(userData);
            
            // Set timeout for session expiration
            const timeLeft = expiresAt - now;
            const timeoutId = setTimeout(() => {
              logout('Sesi Anda telah berakhir. Silakan login kembali.');
            }, timeLeft);
            setSessionTimeout(timeoutId);
          } else {
            // Session expired
            localStorage.removeItem('irs_session');
            setIsAuthenticated(false);
            setCurrentUser(null);
          }
        } catch (error) {
          localStorage.removeItem('irs_session');
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      }
    };
    
    checkSession();
    
    // Cleanup on unmount
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, []);

  const login = (userData, mfaCode, rememberMe = false) => {
    // Session duration: 30 minutes = 30 * 60 * 1000
    const SESSION_DURATION = 30 * 60 * 1000;
    const expiresAt = Date.now() + SESSION_DURATION;
    
    const sessionInfo = {
      expiresAt,
      userData: {
        ...userData,
        loginTime: new Date().toISOString(),
        mfaVerified: true
      }
    };
    
    localStorage.setItem('irs_session', JSON.stringify(sessionInfo));
    setIsAuthenticated(true);
    setCurrentUser(sessionInfo.userData);
    
    // Set timeout for auto logout
    const timeoutId = setTimeout(() => {
      logout('Sesi Anda telah berakhir setelah 30 menit. Silakan login kembali.');
    }, SESSION_DURATION);
    setSessionTimeout(timeoutId);
    
    return true;
  };

  const logout = (message = null) => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    localStorage.removeItem('irs_session');
    setIsAuthenticated(false);
    setCurrentUser(null);
    
    if (message) {
      // Store message to show after redirect
      sessionStorage.setItem('logout_message', message);
    }
  };

  const extendSession = () => {
    if (!isAuthenticated) return false;
    
    const sessionData = localStorage.getItem('irs_session');
    if (sessionData) {
      try {
        const { userData } = JSON.parse(sessionData);
        const SESSION_DURATION = 30 * 60 * 1000;
        const newExpiresAt = Date.now() + SESSION_DURATION;
        
        const newSessionInfo = {
          expiresAt: newExpiresAt,
          userData
        };
        
        localStorage.setItem('irs_session', JSON.stringify(newSessionInfo));
        
        // Reset timeout
        if (sessionTimeout) {
          clearTimeout(sessionTimeout);
        }
        const timeoutId = setTimeout(() => {
          logout('Sesi Anda telah berakhir. Silakan login kembali.');
        }, SESSION_DURATION);
        setSessionTimeout(timeoutId);
        
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  };

  const getRemainingTime = () => {
    if (!isAuthenticated) return 0;
    
    const sessionData = localStorage.getItem('irs_session');
    if (sessionData) {
      try {
        const { expiresAt } = JSON.parse(sessionData);
        const remaining = expiresAt - Date.now();
        return remaining > 0 ? remaining : 0;
      } catch (error) {
        return 0;
      }
    }
    return 0;
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser,
      login,
      logout,
      extendSession,
      getRemainingTime
    }}>
      {children}
    </AuthContext.Provider>
  );
};