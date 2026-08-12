import { useNFCCheck } from "@/features/attendance/nfc-check/model/use-nfc-check";
import { Button } from "@/shared/ui/button";

type NFCCheckButtonProps = {
  readonly typeId: number;
  readonly onSuccess?: () => void;
};

export const NFCCheckButton = ({ typeId, onSuccess }: NFCCheckButtonProps) => {
  const { nfcCheck, isBusy } = useNFCCheck({ onSuccess });

  return (
    <Button variant="primary" disabled={isBusy} onClick={() => nfcCheck(typeId)}>
      {isBusy ? "처리 중..." : "출석하기"}
    </Button>
  );
};
