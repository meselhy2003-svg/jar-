import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    // Redirect to home if they are not an admin but trying to access admin routes
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
