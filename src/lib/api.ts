import axios from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const loginUser = (email: string, password: string) => 
  api.post('/users/login', { email, password });

export const registerUser = (name: string, email: string, password: string) => 
  api.post('/users', { name, email, password });

export const getUserProfile = () => 
  api.get('/users/profile');

export const updateUserProfile = (userData: any) => 
  api.put('/users/profile', userData);

// Brainwave API calls
export const getBrainwaves = (keyword = '', pageNumber = 1) => 
  api.get(`/brainwaves?keyword=${keyword}&pageNumber=${pageNumber}`);

export const getBrainwaveById = (id: string) => 
  api.get(`/brainwaves/${id}`);

export const createBrainwave = (brainwaveData: any) => 
  api.post('/brainwaves', brainwaveData);

export const updateBrainwave = (id: string, brainwaveData: any) => 
  api.put(`/brainwaves/${id}`, brainwaveData);

export const deleteBrainwave = (id: string) => 
  api.delete(`/brainwaves/${id}`);

export const addComment = (id: string, text: string) => 
  api.post(`/brainwaves/${id}/comments`, { text });

export const likeBrainwave = (id: string) => 
  api.put(`/brainwaves/${id}/like`);

export default api;