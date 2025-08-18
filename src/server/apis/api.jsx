import axios from 'axios';

export const api = axios.create({
  baseURL: "https://kihari.shop",
  timeout: 10000,
});

export async function get(url, config = {}) {
  const response = await api.get(url, config);
  return response.data;
}

