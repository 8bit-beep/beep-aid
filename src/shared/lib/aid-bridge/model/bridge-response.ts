import { z } from "zod";

const bridgeErrorSchema = z.enum([
  "TIMEOUT",
  "PERMISSION_DENIED",
  "NOT_SUPPORTED",
  "CANCELLED",
  "UNKNOWN",
]);

const bridgeResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: bridgeErrorSchema.or(z.string()).optional(),
});

const completedBridgeTaskSchema = z.object({
  flag: z.literal("completed"),
  data: z.unknown().optional(),
});

const BRIDGE_ERROR_MESSAGES: Record<string, string> = {
  CANCELLED: "스캔이 취소됐어요.",
  NOT_SUPPORTED: "이 기기에서는 해당 스캔 기능을 사용할 수 없어요.",
  PERMISSION_DENIED: "스캔 권한이 필요해요. 도담 앱 설정을 확인해 주세요.",
  PREMISSION_DENIED: "스캔 권한이 필요해요. 도담 앱 설정을 확인해 주세요.",
  TIMEOUT: "스캔 시간이 초과됐어요. 다시 시도해 주세요.",
  UNKNOWN: "스캔 중 문제가 발생했어요. 다시 시도해 주세요.",
};

export class AidBridgeError extends Error {
  readonly code?: string;

  constructor(message: string, code?: string, cause?: unknown) {
    super(message, { cause });
    this.name = "AidBridgeError";
    this.code = code;
  }
}

export const getBridgeData = (response: unknown) => {
  const parsed = bridgeResponseSchema.safeParse(response);

  if (parsed.success) {
    if (!parsed.data.success) {
      const code = parsed.data.error;
      throw new AidBridgeError(
        (code && BRIDGE_ERROR_MESSAGES[code]) || "스캔에 실패했어요. 다시 시도해 주세요.",
        code
      );
    }

    return parsed.data.data;
  }

  // AID Kit은 앱이 백그라운드에 있는 동안 끝난 작업을 SYNC할 때 task 형태로 전달한다.
  const completedTask = completedBridgeTaskSchema.safeParse(response);
  if (completedTask.success) {
    const taskData = completedTask.data.data;
    if (typeof taskData === "string" && BRIDGE_ERROR_MESSAGES[taskData]) {
      throw new AidBridgeError(BRIDGE_ERROR_MESSAGES[taskData], taskData);
    }
    return taskData;
  }

  // 공식 액션 문서처럼 payload가 직접 전달되는 AID Kit 구현도 지원한다.
  if (typeof response === "string" && BRIDGE_ERROR_MESSAGES[response]) {
    throw new AidBridgeError(BRIDGE_ERROR_MESSAGES[response], response);
  }
  return response;
};
