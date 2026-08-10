import axios, { type CreateAxiosDefaults } from "axios";

export const client = (config: CreateAxiosDefaults) => {
  const client = axios.create({
    timeout: 10000,
    ...config,
  });

  client.interceptors.response.use(
    response => response,
    error => {
      const method = error.config?.method?.toUpperCase() ?? "REQUEST";
      const url = error.config?.url ?? "unknown";
      const status = error.response?.status ?? "NETWORK";

      console.error(`[API Error] ${method} ${url} (${status})`);
      return Promise.reject(error);
    }
  );

  return client;
};
