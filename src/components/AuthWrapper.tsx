
import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from '@/components/LoginPage';
import { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
};
