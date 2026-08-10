import { useEffect, useState } from "react";
import { getAttendanceTypes } from "../api/get-attendance-types";
import type { AttendanceType } from "./attendance-type";

type AttendanceTypesState =
  | { status: "loading"; data: AttendanceType[]; error: null }
  | { status: "success"; data: AttendanceType[]; error: null }
  | { status: "error"; data: AttendanceType[]; error: Error };

const initialState: AttendanceTypesState = {
  status: "loading",
  data: [],
  error: null,
};

const toError = (error: unknown) =>
  error instanceof Error ? error : new Error("출석 타입을 조회하지 못했습니다.");

export const useAttendanceTypes = () => {
  const [state, setState] = useState<AttendanceTypesState>(initialState);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    getAttendanceTypes(controller.signal)
      .then(data => {
        if (active) {
          setState({ status: "success", data, error: null });
        }
      })
      .catch(error => {
        if (active) {
          setState({ status: "error", data: [], error: toError(error) });
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [requestId]);

  const refetch = () => {
    setState(initialState);
    setRequestId(currentRequestId => currentRequestId + 1);
  };

  return {
    attendanceTypes: state.data,
    isLoading: state.status === "loading",
    error: state.error,
    refetch,
  };
};
