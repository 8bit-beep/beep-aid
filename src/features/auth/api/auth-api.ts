import { z } from "zod";
import { userSchema, type User } from "@/entities/user";
import { appClient } from "@/shared/api";

const userResponseSchema = z.union([
  userSchema,
  z.object({
    data: userSchema,
  }),
]);

let pendingDodamToken: string | null | undefined;
let bootstrapRequest: Promise<User> | null = null;

const takeDodamTokenFromUrl = () => {
  if (pendingDodamToken !== undefined) {
    return pendingDodamToken;
  }

  const url = new URL(window.location.href);
  pendingDodamToken = url.searchParams.get("token");

  if (!pendingDodamToken) {
    return null;
  }

  url.searchParams.delete("token");
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);

  return pendingDodamToken;
};

const getCurrentUser = async () => {
  const response = await appClient.get("/auth/me");
  const parsedResponse = userResponseSchema.parse(response.data);

  return "data" in parsedResponse ? parsedResponse.data : parsedResponse;
};

const performAidAuthBootstrap = async () => {
  const dodamToken = takeDodamTokenFromUrl();

  if (dodamToken) {
    await appClient.post("/auth/dodam", { token: dodamToken });
    pendingDodamToken = null;
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

export const logoutAidAuth = async () => {
  await appClient.post("/auth/logout");
  pendingDodamToken = null;
  bootstrapRequest = null;
};
