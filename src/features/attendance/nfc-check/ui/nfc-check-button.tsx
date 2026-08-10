import { useNFCCheck } from "@/features/attendance/nfc-check/model/use-nfc-check";
import { Button } from "@/shared/ui/button";

type NFCCheckButtonProps = {
  readonly onSuccess?: () => void;
};

export const NFCCheckButton = ({ onSuccess }: NFCCheckButtonProps) => {
  const { nfcCheck } = useNFCCheck(onSuccess);

  return (
    <Button variant="primary" onClick={nfcCheck}>
      출석하기
    </Button>
  );
};
