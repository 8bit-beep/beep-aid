import { z } from "zod";

export const createAttendanceRequestSchema = z.object({
  roomId: z.number().int().positive(),
  typeId: z.number().int().positive(),
});

export const scanHelpQrRequestSchema = z.object({
  token: z.string().trim().min(1),
  typeId: z.number().int().positive(),
});

export type CreateAttendanceRequest = z.infer<typeof createAttendanceRequestSchema>;
export type ScanHelpQrRequest = z.infer<typeof scanHelpQrRequestSchema>;
