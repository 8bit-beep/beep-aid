import { useRef, useState } from "react";
import { cancelAttendance, toAttendanceError } from "@/entities/attendance";

export const useCheckOutAttendance = (onSuccess?: () => void | Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isPendingRef = useRef(false);

  const checkOutAttendance = async () => {
    if (isPendingRef.current) return;

    isPendingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      await cancelAttendance();
      await onSuccess?.();
    } catch (caughtError) {
      setError(toAttendanceError(caughtError));
    } finally {
      isPendingRef.current = false;
      setIsLoading(false);
    }
  };

  return { checkOutAttendance, isLoading, error };
};
