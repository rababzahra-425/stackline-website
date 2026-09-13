import React from 'react';
import { ThemeProvider } from '../../shared/context/ThemeContext';
import { AuthProvider } from '../../modules/admin/auth/context/AuthContext';

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
