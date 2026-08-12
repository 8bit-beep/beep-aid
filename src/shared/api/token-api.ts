import { z } from "zod";
import { getDodamToken, getRefreshToken, setTokens } from "@/shared/lib/auth-token";
import { client } from "./client";
import { API_BASE_URL } from "./config";

// 재발급 요청 자체가 401 재시도 로직을 다시 타면 무한 루프가 되므로,
// 인증 인터셉터가 붙지 않은 별도 인스턴스를 쓴다.
const tokenClient = client({ baseURL: API_BASE_URL });

const tokenResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

const storeTokenResponse = (data: unknown) => {
  const { accessToken, refreshToken } = tokenResponseSchema.parse(data);
  setTokens({ accessToken, refreshToken });

  return accessToken;
};

export const exchangeDodamToken = async (dodamToken: string) => {
  const response = await tokenClient.post("/auth/dodam", { token: dodamToken });
  return storeTokenResponse(response.data);
};

const refreshTokens = async (refreshToken: string) => {
  const response = await tokenClient.post("/auth/refresh", { refreshToken });
  return storeTokenResponse(response.data);
};

const performReissue = async () => {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    try {
      return await refreshTokens(refreshToken);
    } catch {
      // 리프레시 토큰(30일)도 만료된 경우 아래 도담 토큰 재교환으로 넘어간다.
    }
  }

  const dodamToken = getDodamToken();

  if (!dodamToken) {
    throw new Error("재발급에 사용할 토큰이 없습니다.");
  }

  return exchangeDodamToken(dodamToken);
};

let reissueRequest: Promise<string> | null = null;

/** 동시에 401을 받은 요청들이 재발급을 중복 호출하지 않도록 하나의 요청을 공유한다. */
export const reissueAccessToken = () => {
  reissueRequest ??= performReissue().finally(() => {
    reissueRequest = null;
  });

  return reissueRequest;
};
