
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // If authentication is still loading, show nothing (or a loading spinner)
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/giris" />;
  }

  // If user is authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
