import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../modules/admin/auth/context/AuthContext';

/**
 * Route-level Authentication Guard for Admin Dashboard views.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0d0d0e] flex items-center justify-center text-white font-mono text-sm uppercase tracking-widest">
        <span>Verifying Security Credentials...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
