import { Actions, useBridgeProvider, useBridgeResponse } from "@b1nd/aid-kit/bridge-kit/web";
import type { NFCReeadResponse } from "./nfc-response.schema";

export const useNFCRead = (onSuccess?: () => void) => {
  const { send } = useBridgeProvider();

  useBridgeResponse(Actions.NFC_READ, async response => {
    const result = response as NFCReeadResponse;

    if (!result.success) {
      console.error("NFC 인식 실패:", result.error)
      return {};
    }

    console.log("NFC 인식 결과", result.data);
    onSuccess?.();
    return {};
  });

  const nfcCheck = () => {
    send(Actions.NFC_READ);
  }

  return { nfcCheck };

}
