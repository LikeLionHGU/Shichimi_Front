import axios from 'axios';

export const api = axios.create({
  baseURL : import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
});

export async function get(url, {params, signal, headers} = {}) {
  const response = await api.get(url, {params, signal, headers});
  return response.data;
}

