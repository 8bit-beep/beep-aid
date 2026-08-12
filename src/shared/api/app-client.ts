import type { InternalAxiosRequestConfig } from "axios";
import { clearTokens, getAccessToken } from "@/shared/lib/auth-token";
import { client } from "./client";
import { API_BASE_URL } from "./config";
import { reissueAccessToken } from "./token-api";

type RetriableRequestConfig = InternalAxiosRequestConfig & { retried?: boolean };

export const appClient = client({ baseURL: API_BASE_URL });

appClient.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 액세스 토큰(100분)이 만료되면 재발급 후 한 번만 재시도한다.
appClient.interceptors.response.use(undefined, async error => {
  const config = error.config as RetriableRequestConfig | undefined;

  if (error.response?.status !== 401 || !config || config.retried) {
    throw error;
  }

  config.retried = true;

  try {
    const accessToken = await reissueAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;

    return await appClient(config);
  } catch {
    clearTokens();
    throw error;
  }
});
