import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getBrainwaves, createBrainwave, updateBrainwave, deleteBrainwave } from '../lib/api';
import { useAuth } from './AuthContext';

interface Brainwave {
  _id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  user: {
    _id: string;
    name: string;
    profilePicture?: string;
  };
  likes: string[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

interface BrainwaveContextType {
  brainwaves: Brainwave[];
  loading: boolean;
  error: string | null;
  fetchBrainwaves: (keyword?: string, page?: number) => Promise<void>;
  createNewBrainwave: (brainwaveData: any) => Promise<Brainwave | null>;
  updateExistingBrainwave: (id: string, brainwaveData: any) => Promise<Brainwave | null>;
  deleteExistingBrainwave: (id: string) => Promise<boolean>;
}

const BrainwaveContext = createContext<BrainwaveContextType | undefined>(undefined);

export const useBrainwaves = () => {
  const context = useContext(BrainwaveContext);
  if (!context) {
    throw new Error('useBrainwaves must be used within a BrainwaveProvider');
  }
  return context;
};

interface BrainwaveProviderProps {
  children: ReactNode;
}

export const BrainwaveProvider: React.FC<BrainwaveProviderProps> = ({ children }) => {
  const [brainwaves, setBrainwaves] = useState<Brainwave[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBrainwaves = async (keyword = '', page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getBrainwaves(keyword, page);
      setBrainwaves(data.brainwaves);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch brainwaves');
    } finally {
      setLoading(false);
    }
  };

  const createNewBrainwave = async (brainwaveData: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await createBrainwave(brainwaveData);
      setBrainwaves([data, ...brainwaves]);
      return data;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create brainwave');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingBrainwave = async (id: string, brainwaveData: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await updateBrainwave(id, brainwaveData);
      setBrainwaves(
        brainwaves.map((brainwave) => (brainwave._id === id ? data : brainwave))
      );
      return data;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update brainwave');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingBrainwave = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteBrainwave(id);
      setBrainwaves(brainwaves.filter((brainwave) => brainwave._id !== id));
      return true;
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to delete brainwave');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load brainwaves when user changes
  useEffect(() => {
    if (user) {
      fetchBrainwaves();
    }
  }, [user]);

  return (
    <BrainwaveContext.Provider
      value={{
        brainwaves,
        loading,
        error,
        fetchBrainwaves,
        createNewBrainwave,
        updateExistingBrainwave,
        deleteExistingBrainwave,
      }}
    >
      {children}
    </BrainwaveContext.Provider>
  );
};

export default BrainwaveContext;