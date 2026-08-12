import { useEffect, useState } from "react";
import { getMySchedules } from "../api/get-my-schedules";
import type { StudentSchedule } from "./schedule.schema";

type MySchedulesState =
  | { status: "loading"; data: StudentSchedule[]; error: null }
  | { status: "success"; data: StudentSchedule[]; error: null }
  | { status: "error"; data: StudentSchedule[]; error: Error };

const initialState: MySchedulesState = {
  status: "loading",
  data: [],
  error: null,
};

const toError = (error: unknown) =>
  error instanceof Error ? error : new Error("스케줄을 조회하지 못했습니다.");

export const useMySchedules = () => {
  const [state, setState] = useState<MySchedulesState>(initialState);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    getMySchedules(controller.signal)
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
    schedules: state.data,
    isLoading: state.status === "loading",
    error: state.error,
    refetch,
  };
};
