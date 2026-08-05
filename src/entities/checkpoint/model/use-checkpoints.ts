import { useEffect, useState } from "react";
import { getCheckpoints } from "../api/get-checkpoints";
import type { Checkpoint } from "./types";

export const useCheckpoints = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[] | null>(null);

  useEffect(() => {
    getCheckpoints()
      .then(setCheckpoints)
      .catch(() => setCheckpoints([]));
  }, []);

  return { checkpoints };
};
