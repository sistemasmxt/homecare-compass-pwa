
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users - senha padrão 'demo' para todos
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Maria Silva',
    email: 'maria@healthcare.com',
    role: 'admin',
    avatar: ''
  },
  {
    id: '2', 
    name: 'Dr. João Santos',
    email: 'joao@healthcare.com',
    role: 'doctor',
    specialty: 'Cardiologia'
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana@healthcare.com', 
    role: 'caregiver',
    license: 'CRE-12345'
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    email: 'carlos@patient.com',
    role: 'patient',
    patientId: 'P001'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar sessão salva
  useEffect(() => {
    const savedUser = localStorage.getItem('healthcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Aceitar senha 'demo' para todos os usuários
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'demo') {
      setUser(foundUser);
      localStorage.setItem('healthcare_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Credenciais inválidas');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
