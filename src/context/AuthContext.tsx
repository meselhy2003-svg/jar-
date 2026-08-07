import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, UserRole } from '../api/auth';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuthUser: (user: AuthUser) => void;
  logout: () => void;
  login: (email: string, role?: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const setAuthUser = (userData: AuthUser) => {
    setUser(userData);
  };


  const login = (email: string, role: UserRole = 'student') => {
    setUser({
      _id: '',
      fullName: email.split('@')[0],
      email,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setAuthUser,
        login,
        logout,
      }}
    >
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
