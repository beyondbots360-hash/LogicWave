import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute
 *
 * Props:
 *   - children:      The page component to render.
 *   - allowedRoles:  Optional array of roles that may access this route.
 *                    If omitted, any authenticated user may access the page.
 *                    Example: allowedRoles={['admin']}
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Show spinner while auth state is resolving
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-brand-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → redirect to the correct home for this role
  if (allowedRoles && profile?.role && !allowedRoles.includes(profile.role)) {
    const roleHome = profile.role === 'blogger' ? '/blog-dashboard' : '/dashboard';
    return <Navigate to={roleHome} state={{ accessDenied: true }} replace />;
  }

  return children;
};

export default ProtectedRoute;
