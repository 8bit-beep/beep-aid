export type AttendanceModalProps = {
  readonly onClose: () => void;
  readonly method: AttendanceMethod;
};

export type AttendanceMethod = "NFC" | "QR";
