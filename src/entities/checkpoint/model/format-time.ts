import type { TimeOfDay } from "./types";

export const formatTime = ({ hour, minute }: TimeOfDay) =>
  `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
