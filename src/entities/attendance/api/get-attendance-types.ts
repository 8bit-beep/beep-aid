import { appClient } from "@/shared/api";
import { attendanceTypesSchema } from "../model/attendance-type";

export const getAttendanceTypes = async (signal?: AbortSignal) => {
  const response = await appClient.get("/types", { signal });
  return attendanceTypesSchema.parse(response.data);
};
