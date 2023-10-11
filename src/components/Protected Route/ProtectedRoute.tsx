import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface TokenProtectedRouteProps {
  children: ReactNode;
}

const TokenProtectedRoute: React.FC<TokenProtectedRouteProps> = ({ children }) => {

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default TokenProtectedRoute;
