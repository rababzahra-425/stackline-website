import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kajo_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('kajo_token') || null);
  const [loading, setLoading] = useState(false);

  // Auto-verify session on mount if token exists
  useEffect(() => {
    const checkAuth = async () => {
      if (token && !user) {
        setLoading(true);
        try {
          const res = await authService.getMe();
          setUser(res.user);
          localStorage.setItem('kajo_admin_user', JSON.stringify(res.user));
        } catch (err) {
          console.warn('Auth token verification failed:', err.message);
          logout();
        } finally {
          setLoading(false);
        }
      }
    };
    checkAuth();
  }, [token]);

  const saveAuthSession = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('kajo_token', authToken);
    localStorage.setItem('kajo_admin_user', JSON.stringify(userData));
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      saveAuthSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await authService.signup(name, email, password);
      saveAuthSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = async (googlePayload) => {
    setLoading(true);
    try {
      const data = await authService.googleAuth(googlePayload);
      saveAuthSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    return await authService.forgotPassword(email);
  };

  const verifyOtp = async (email, otpCode, newPassword) => {
    return await authService.verifyOtp(email, otpCode, newPassword);
  };

  const resetPassword = async (resetToken, newPassword) => {
    const data = await authService.resetPassword(resetToken, newPassword);
    if (data.token && data.user) {
      saveAuthSession(data.token, data.user);
    }
    return data;
  };

  const updateProfile = async (profileData) => {
    const res = await authService.updateProfile(profileData);
    if (res.user) {
      setUser(res.user);
      localStorage.setItem('kajo_admin_user', JSON.stringify(res.user));
    }
    return res;
  };

  const changePassword = async (currentPassword, newPassword) => {
    return await authService.changePassword(currentPassword, newPassword);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('kajo_token');
    localStorage.removeItem('kajo_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        signup,
        googleAuth,
        forgotPassword,
        verifyOtp,
        resetPassword,
        updateProfile,
        changePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
