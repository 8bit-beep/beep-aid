import { useQRCheck } from "@/features/attendance/qr-check/model/use-qr-check";
import { Button } from "@/shared/ui/button";

type QRCheckButtonProps = {
  readonly onSuccess?: () => void;
};

export const QRCheckButton = ({ onSuccess }: QRCheckButtonProps) => {
  const { qrCheck } = useQRCheck(onSuccess);

  return (
    <Button variant="secondary" onClick={qrCheck}>
      QR 찍기
    </Button>
  );
};
