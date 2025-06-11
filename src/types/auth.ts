
export type UserRole = 'admin' | 'doctor' | 'caregiver' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialty?: string; // Para médicos
  license?: string; // Para cuidadores
  patientId?: string; // Para pacientes
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
