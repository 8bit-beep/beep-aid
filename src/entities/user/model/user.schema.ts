import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  studentInfo: z.string().min(1),
  username: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
