import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AxiosError } from 'axios';
import { loginUser, registerUser, getUserProfile } from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  profilePicture?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      const userFromStorage = localStorage.getItem('user');
      if (userFromStorage) {
        try {
          setUser(JSON.parse(userFromStorage));
          // Verify token is still valid by getting user profile
          const { data } = await getUserProfile();
          if (!data) {
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
            setUser(null);
          }
        } catch (error) {
          localStorage.removeItem('user');
          localStorage.removeItem('userToken');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await loginUser(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('userToken', data.token);
      setUser(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await registerUser(name, email, password);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('userToken', data.token);
      setUser(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;