import axios from "axios";
import { z } from "zod";

const errorResponseSchema = z.object({
  code: z.string().optional(),
  status: z.number().int().optional(),
  message: z.string().optional(),
});

const ERROR_MESSAGES: Record<string, string> = {
  ALREADY_ATTENDED: "이미 출석이 완료되어 있어요.",
  ATTENDANCE_NOT_FOUND: "취소할 출석 기록이 없어요.",
  CONCURRENT_MODIFICATION: "요청이 겹쳤어요. 잠시 후 다시 시도해 주세요.",
  INVALID_HELP_QR: "유효하지 않거나 만료된 QR이에요.",
  ROOM_MISMATCH: "현재 일정에 등록된 실과 다른 NFC 태그예요.",
  ROOM_NOT_FOUND: "NFC 태그에 등록된 실을 찾을 수 없어요.",
  TIME_UNAVAILABLE: "현재는 출석할 수 있는 시간이 아니에요.",
  TYPE_MISMATCH: "현재 일정과 선택한 출석 유형이 달라요.",
};

export class AttendanceError extends Error {
  readonly code?: string;
  readonly status?: number;

  constructor(message: string, options: { code?: string; status?: number; cause?: unknown } = {}) {
    super(message, { cause: options.cause });
    this.name = "AttendanceError";
    this.code = options.code;
    this.status = options.status;
  }
}

export const toAttendanceError = (error: unknown) => {
  if (error instanceof AttendanceError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const parsed = errorResponseSchema.safeParse(error.response?.data);
    const code = parsed.success ? parsed.data.code : undefined;
    const status = parsed.success ? parsed.data.status : error.response?.status;
    const serverMessage = parsed.success ? parsed.data.message : undefined;
    const message =
      (code && ERROR_MESSAGES[code]) ||
      serverMessage ||
      (error.response
        ? "출석 요청을 처리하지 못했어요. 다시 시도해 주세요."
        : "네트워크 연결을 확인한 뒤 다시 시도해 주세요.");

    return new AttendanceError(message, { code, status, cause: error });
  }

  return new AttendanceError("출석 요청을 처리하지 못했어요. 다시 시도해 주세요.", {
    cause: error,
  });
};
