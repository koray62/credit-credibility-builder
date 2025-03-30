
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If authentication is still loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-gray-500">Yükleniyor...</p>
      </div>
    );
  }

  // If user is not authenticated, redirect to login with the return path
  if (!user) {
    return <Navigate to="/giris" state={{ from: location.pathname }} />;
  }

  // If user is authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
