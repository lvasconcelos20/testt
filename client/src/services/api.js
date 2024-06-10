import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002', // URL base do seu servidor backend
});

export default api;
