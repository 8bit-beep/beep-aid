import { z } from "zod";
import { AidBridgeError } from "../model/bridge-response";

const tokenSchema = z.string().trim().min(1);

const qrDataSchema = z.union([
  tokenSchema.transform(text => ({ text })),
  z.object({ text: tokenSchema }),
  z.object({ value: tokenSchema }).transform(({ value }) => ({ text: value })),
]);

const parseTokenFromText = (rawText: string) => {
  const text = rawText.trim();

  try {
    const json = JSON.parse(text) as unknown;
    const parsed = z.object({ token: tokenSchema }).safeParse(json);
    if (parsed.success) return parsed.data.token;
  } catch {
    // JSON이 아니면 URL 또는 원문 토큰으로 처리한다.
  }

  try {
    const url = new URL(text);
    const token = url.searchParams.get("token");
    if (token) return tokenSchema.parse(token);
  } catch {
    // URL이 아니면 서버가 발급한 토큰 원문으로 처리한다.
  }

  return tokenSchema.parse(text);
};

export const parseHelpQrToken = (data: unknown) => {
  const parsed = qrDataSchema.safeParse(data);

  if (!parsed.success) {
    throw new AidBridgeError("QR 코드에서 출석 토큰을 확인할 수 없어요.");
  }

  return parseTokenFromText(parsed.data.text);
};
