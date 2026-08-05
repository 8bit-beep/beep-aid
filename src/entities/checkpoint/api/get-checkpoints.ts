import { beepClient } from "@/shared/api";
import type { Checkpoint } from "../model/types";

export const getCheckpoints = async () => {
  const { data } = await beepClient.get<Checkpoint[]>("/checkpoints");
  return data;
};
