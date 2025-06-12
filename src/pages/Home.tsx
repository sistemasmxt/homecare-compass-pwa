
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Index from './Index';

export default function Home() {
  const { user } = useAuth();
  
  // Se não estiver logado, vai para landing
  if (!user) {
    return <Navigate to="/landing" replace />;
  }
  
  // Se estiver logado, mostra o dashboard apropriado
  return <Index />;
}
