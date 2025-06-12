
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth();
  
  // Se o usuário estiver logado, redireciona para o dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
