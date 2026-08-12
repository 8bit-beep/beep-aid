import type { AttendanceType } from "@/entities/attendance";

export type AttendanceModalProps = {
  readonly onClose: () => void;
  readonly onSuccess: (attendanceType: AttendanceType) => void | Promise<void>;
  readonly method: AttendanceMethod;
};

export type AttendanceMethod = "NFC" | "QR";
