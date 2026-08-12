import { appClient } from "@/shared/api";
import {
  createAttendanceRequestSchema,
  type CreateAttendanceRequest,
} from "../model/attendance-request";

export const createAttendance = async (request: CreateAttendanceRequest) => {
  await appClient.post("/attendances", createAttendanceRequestSchema.parse(request));
};
