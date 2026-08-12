import { userSchema, type User } from "@/entities/user";
import { appClient, exchangeDodamToken } from "@/shared/api";
import { getAccessToken, getDodamToken, setTokens } from "@/shared/lib/auth-token";

let bootstrapRequest: Promise<User> | null = null;

// 도담 앱이 WebView를 열 때 URL에 실어 주는 토큰. 한 번 읽고 주소창에서 지운 뒤,
// 리프레시 토큰까지 만료됐을 때 재교환용으로 쓰도록 토큰 스토어에 보관한다.
const consumeDodamTokenFromUrl = () => {
  const url = new URL(window.location.href);
  const dodamToken = url.searchParams.get("token");

  if (!dodamToken) {
    return null;
  }

  url.searchParams.delete("token");
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  setTokens({ dodamToken });

  return dodamToken;
};

export const getCurrentUser = async () => {
  const response = await appClient.get("/users/my");
  return userSchema.parse(response.data);
};

const performAidAuthBootstrap = async () => {
  const dodamToken = consumeDodamTokenFromUrl();

  if (dodamToken) {
    await exchangeDodamToken(dodamToken);
  } else if (!getAccessToken()) {
    // 새로고침 등으로 URL 토큰이 없고 저장된 액세스 토큰도 없는 경우.
    const storedDodamToken = getDodamToken();

    if (!storedDodamToken) {
      throw new Error("도담 토큰이 없어 인증할 수 없습니다.");
    }

    await exchangeDodamToken(storedDodamToken);
  }

  return getCurrentUser();
};

export const bootstrapAidAuth = () => {
  bootstrapRequest ??= performAidAuthBootstrap();
  return bootstrapRequest;
};

export const retryAidAuth = () => {
  bootstrapRequest = null;
  return bootstrapAidAuth();
};
