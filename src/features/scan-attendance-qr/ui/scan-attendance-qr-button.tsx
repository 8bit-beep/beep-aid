import { useScanAttendanceQr } from "@/features/scan-attendance-qr/model/use-scan-attendance-qr";
import { Button } from "@/shared/ui/button";

export const ScanAttendanceQrButton = () => {
  const { scanAttendanceQr } = useScanAttendanceQr();

  return (
    <Button variant="secondary" onClick={scanAttendanceQr}>
      QR 찍기
    </Button>
  );
};
