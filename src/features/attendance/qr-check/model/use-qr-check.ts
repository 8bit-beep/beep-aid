import { useEffect, useRef, useState } from "react";
import { Actions, useBridgeProvider, useBridgeResponse } from "@b1nd/aid-kit/bridge-kit/web";
import { scanHelpQr, toAttendanceError } from "@/entities/attendance";
import { AidBridgeError, getBridgeData, parseHelpQrToken } from "@/shared/lib/aid-bridge";

type AttendanceActionStatus = "idle" | "scanning" | "submitting" | "success" | "error";

type UseQRCheckOptions = {
  readonly onSuccess?: () => void | Promise<void>;
};

export const useQRCheck = ({ onSuccess }: UseQRCheckOptions = {}) => {
  const { send } = useBridgeProvider();
  const [status, setStatus] = useState<AttendanceActionStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  const pendingTypeIdRef = useRef<number | null>(null);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useBridgeResponse(Actions.QR_SCAN, async response => {
    const typeId = pendingTypeIdRef.current;
    if (typeId === null) return {};

    try {
      const token = parseHelpQrToken(getBridgeData(response));
      setStatus("submitting");
      await scanHelpQr({ token, typeId });

      pendingTypeIdRef.current = null;
      setStatus("success");
      setError(null);

      try {
        await onSuccessRef.current?.();
      } catch (refreshError) {
        console.error("출석 후 사용자 상태 동기화 실패", refreshError);
      }
    } catch (caughtError) {
      pendingTypeIdRef.current = null;
      setStatus("error");
      setError(
        caughtError instanceof AidBridgeError ? caughtError : toAttendanceError(caughtError)
      );
    }

    return {};
  });

  const qrCheck = (typeId: number) => {
    if (pendingTypeIdRef.current !== null) return;

    if (!("ReactNativeWebView" in window)) {
      setStatus("error");
      setError(new AidBridgeError("QR 출석은 도담 앱에서 이용해 주세요."));
      return;
    }

    pendingTypeIdRef.current = typeId;
    setError(null);
    setStatus("scanning");
    send(Actions.QR_SCAN);
  };

  const reset = () => {
    if (pendingTypeIdRef.current !== null) return;
    setStatus("idle");
    setError(null);
  };

  return {
    qrCheck,
    status,
    error,
    isBusy: status === "scanning" || status === "submitting",
    reset,
  };
};
