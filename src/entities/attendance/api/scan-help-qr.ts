import { appClient } from "@/shared/api";
import { scanHelpQrRequestSchema, type ScanHelpQrRequest } from "../model/attendance-request";

export const scanHelpQr = async (request: ScanHelpQrRequest) => {
  await appClient.post("/attendances/help/scan", scanHelpQrRequestSchema.parse(request));
};
