import { Actions, useBridgeProvider, useBridgeResponse } from "@b1nd/aid-kit/bridge-kit/web";

export const useScanAttendanceQr = (onSuccess?: () => void) => {
  const { send } = useBridgeProvider();

  useBridgeResponse(Actions.QR_SCAN, async () => {
    // TODO: 스캔한 QR 값(data.text)을 서버로 전송해 출석 처리
    onSuccess?.();
    return {};
  });

  const scanAttendanceQr = () => send(Actions.QR_SCAN);

  return { scanAttendanceQr };
};
