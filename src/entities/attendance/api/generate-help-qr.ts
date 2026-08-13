import { appClient } from "@/shared/api";
import { helpQrResponseSchema } from "../model/help-qr";

export const generateHelpQr = async () => {
  const response = await appClient.post("/attendances/help/qr");
  return helpQrResponseSchema.parse(response.data);
};
