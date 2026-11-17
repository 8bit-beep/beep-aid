import { appClient } from "@/shared/api";
import { checkpointsSchema } from "../model/checkpoint.schema";

export const getCheckpoints = async (signal?: AbortSignal) => {
  const response = await appClient.get("/checkpoints", { signal });
  return checkpointsSchema.parse(response.data);
};
