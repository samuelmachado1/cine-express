import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const createSession = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
}