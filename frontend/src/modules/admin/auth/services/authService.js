import { API_BASE_URL } from '@/shared/config/api';

const API_URL = `${API_BASE_URL}/auth`;

const getAuthHeader = () => {
  const token = localStorage.getItem('kajo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  // Local Email/Password Signup
  signup: async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },

  // Local Email/Password Login
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },

  // Continue with Google Auth
  googleAuth: async (googleData) => {
    try {
      const response = await fetch(`${API_URL}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Google authentication failed');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },

  // Request Password Reset OTP
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to request OTP');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },

  // Verify 6-Digit OTP & Set New Password
  verifyOtp: async (email, otpCode, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP Verification failed');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },

  // Submit New Password with Reset Token
  resetPassword: async (token, password) => {
    try {
      const response = await fetch(`${API_URL}/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to reset password');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },

  // Get Current Authenticated Admin User
  getMe: async () => {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: { ...getAuthHeader() },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Session expired');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Session error');
    }
  },

  // Update Admin Profile & Settings
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update profile');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },

  // Change Admin Password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to change password');
      return data;
    } catch (err) {
      throw new Error(err.message || 'Network error');
    }
  },
};

export default authService;
