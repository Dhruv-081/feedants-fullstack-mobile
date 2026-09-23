import axios from 'axios';

// Replace with your local machine's IP if testing on a physical device
const API_BASE_URL = 'http://192.168.1.34:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getCompetitionDetails = async (id: string) => {
  const response = await api.get(`/competitions/${id}`);
  return response.data;
};

export const getMyStatus = async (id: string, userId?: string) => {
  const response = await api.get(`/competitions/${id}/my-status`, {
    params: { userId },
  });
  return response.data;
};

export const registerCompetition = async (id: string, userData: { name: string; email: string; phone?: string; userId?: string }) => {
  const response = await api.post(`/competitions/${id}/register`, userData);
  return response.data;
};

export const submitEntry = async (id: string, data: { userId: string; videoUrl: string }) => {
  const response = await api.post(`/competitions/${id}/submission`, data);
  return response.data;
};

export const getWinners = async (id: string) => {
  const response = await api.get(`/competitions/${id}/winners`);
  return response.data;
};

export const getReviews = async (id: string) => {
  const response = await api.get(`/competitions/${id}/reviews`);
  return response.data;
};

export default api;
