import axios, { type CreateAxiosDefaults } from "axios";

export const client = (config: CreateAxiosDefaults) => {
  const client = axios.create({
    timeout: 10000,
    ...config,
  });

  client.interceptors.response.use(
    response => response,
    error => {
      console.error(`[API Error] ${error.config?.url}`, error);
      return Promise.reject(error);
    }
  );

  return client;
};
