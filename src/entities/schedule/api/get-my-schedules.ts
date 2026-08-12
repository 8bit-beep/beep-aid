import { appClient } from "@/shared/api";
import { studentSchedulesSchema } from "../model/schedule.schema";

export const getMySchedules = async (signal?: AbortSignal) => {
  const response = await appClient.get("/schedules/my", { signal });
  return studentSchedulesSchema.parse(response.data);
};
