import { z } from "zod";

export const helpQrResponseSchema = z.object({
  token: z.string().trim().min(1),
});

export type HelpQrResponse = z.infer<typeof helpQrResponseSchema>;
