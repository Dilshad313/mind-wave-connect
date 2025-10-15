import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { register, login } from '../services/auth.api';

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
  register: (userData: any) => Promise<void>;
  login: (userData: any) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await register(userData);
          set({
            user: res.data,
            token: res.data.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ error, loading: false });
        }
      },
      login: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await login(userData);
          set({
            user: res.data,
            token: res.data.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ error, loading: false });
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
