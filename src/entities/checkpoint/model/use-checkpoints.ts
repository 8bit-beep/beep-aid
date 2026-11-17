import { useEffect, useState } from "react";
import { getCheckpoints } from "../api/get-checkpoints";
import type { Checkpoint } from "./checkpoint.schema";

type CheckpointsState =
  | { status: "loading"; data: Checkpoint[]; error: null }
  | { status: "success"; data: Checkpoint[]; error: null }
  | { status: "error"; data: Checkpoint[]; error: Error };

const initialState: CheckpointsState = {
  status: "loading",
  data: [],
  error: null,
};

const toError = (error: unknown) =>
  error instanceof Error ? error : new Error("체크포인트를 조회하지 못했습니다.");

export const useCheckpoints = () => {
  const [state, setState] = useState<CheckpointsState>(initialState);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    getCheckpoints(controller.signal)
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
  }, []);

  return {
    checkpoints: state.data,
    isLoading: state.status === "loading",
    error: state.error,
  };
};
