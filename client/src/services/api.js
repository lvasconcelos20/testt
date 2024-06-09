// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pelo seu URL base do backend
});

export default api;
export const checkBackendConnection = async () => {
  try {
    await api.get('/status');
    return true;
  } catch (error) {
    return false;
  }
};
