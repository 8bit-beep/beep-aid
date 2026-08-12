import { appClient } from "@/shared/api";

export const cancelAttendance = async () => {
  await appClient.patch("/attendances/cancel");
};
