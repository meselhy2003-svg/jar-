import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import type { AuthUser, UserRole } from '../api/auth';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuthUser: (user: AuthUser, token?: string) => void;
  logout: () => void;
  login: (email: string, role?: UserRole, extra?: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('jar_auth_token') || null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('jar_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Attach token to axios default headers whenever it changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        localStorage.setItem('jar_auth_token', token);
      } catch (e) {
        console.error('Failed to save token to localStorage', e);
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      try {
        localStorage.removeItem('jar_auth_token');
      } catch (e) {
        console.error('Failed to remove token from localStorage', e);
      }
    }
  }, [token]);

  // Save user object to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('jar_auth_user', JSON.stringify(user));
      } catch (e) {
        console.error('Failed to save user to localStorage', e);
      }
    } else {
      try {
        localStorage.removeItem('jar_auth_user');
      } catch (e) {
        console.error('Failed to remove user from localStorage', e);
      }
    }
  }, [user]);

  const setAuthUser = (userData: AuthUser, authToken?: string) => {
    setUser(userData);
    if (authToken) {
      setToken(authToken);
    }
  };

  const login = (email: string, role: UserRole = 'student', extra?: Partial<AuthUser>) => {
    const defaultName = email.split('@')[0] || (role === 'instructor' ? 'Dr. Ahmed Mohamed' : 'Ahmed Mohamed');
    const newUser: AuthUser = {
      _id: extra?._id || `user-${Date.now()}`,
      fullName: extra?.fullName || defaultName,
      email,
      role,
      phoneNumber: extra?.phoneNumber || '+966 50 123 4567',
      university: extra?.university || (role === 'instructor' ? 'King Saud University' : 'King Salman University'),
      faculty: extra?.faculty || 'College of Computer Science',
      major: extra?.major || 'Computer Science',
      year: extra?.year || 'second',
      country: extra?.country || 'Saudi Arabia',
      active: true,
      ...extra,
    };

    setUser(newUser);
    const mockToken = `demo_jwt_${role}_${Date.now()}`;
    setToken(mockToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
