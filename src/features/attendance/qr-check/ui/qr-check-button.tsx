import { useQRCheck } from "@/features/attendance/qr-check/model/use-qr-check";
import { Button } from "@/shared/ui/button";

type QRCheckButtonProps = {
  readonly typeId: number;
  readonly onSuccess?: () => void;
};

export const QRCheckButton = ({ typeId, onSuccess }: QRCheckButtonProps) => {
  const { qrCheck, isBusy } = useQRCheck({ onSuccess });

  return (
    <Button variant="secondary" disabled={isBusy} onClick={() => qrCheck(typeId)}>
      {isBusy ? "처리 중..." : "QR 찍기"}
    </Button>
  );
};
