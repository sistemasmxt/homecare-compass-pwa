
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Index from './Index';

export default function Home() {
  console.log('Home component rendering...');
  const { user } = useAuth();
  
  console.log('User state in Home:', user);
  
  // Se não estiver logado, vai para landing
  if (!user) {
    console.log('No user found, redirecting to landing');
    return <Navigate to="/landing" replace />;
  }
  
  console.log('User found, rendering dashboard with layout');
  // Se estiver logado, mostra o dashboard com layout
  return (
    <Layout>
      <Index />
    </Layout>
  );
}
