import { useEffect, useRef, useState } from "react";
import { Actions, useBridgeProvider, useBridgeResponse } from "@b1nd/aid-kit/bridge-kit/web";
import { createAttendance, toAttendanceError } from "@/entities/attendance";
import { AidBridgeError, getBridgeData, parseNfcRoomId } from "@/shared/lib/aid-bridge";

type AttendanceActionStatus = "idle" | "scanning" | "submitting" | "success" | "error";

type UseNFCCheckOptions = {
  readonly onSuccess?: () => void | Promise<void>;
};

export const useNFCCheck = ({ onSuccess }: UseNFCCheckOptions = {}) => {
  const { send } = useBridgeProvider();
  const [status, setStatus] = useState<AttendanceActionStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  const pendingTypeIdRef = useRef<number | null>(null);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useBridgeResponse(Actions.NFC_READ, async response => {
    const typeId = pendingTypeIdRef.current;
    if (typeId === null) return {};

    try {
      const roomId = parseNfcRoomId(getBridgeData(response));
      setStatus("submitting");
      await createAttendance({ roomId, typeId });

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

  const nfcCheck = (typeId: number) => {
    if (pendingTypeIdRef.current !== null) return;

    if (!("ReactNativeWebView" in window)) {
      setStatus("error");
      setError(new AidBridgeError("NFC 출석은 도담 앱에서 이용해 주세요."));
      return;
    }

    pendingTypeIdRef.current = typeId;
    setError(null);
    setStatus("scanning");
    send(Actions.NFC_READ);
  };

  const reset = () => {
    if (pendingTypeIdRef.current !== null) return;
    setStatus("idle");
    setError(null);
  };

  return {
    nfcCheck,
    status,
    error,
    isBusy: status === "scanning" || status === "submitting",
    reset,
  };
};
