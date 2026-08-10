import { useEffect, useState } from "react";
import { toastManager, type ToastItemData } from "./toast-manager";

export const useToasts = () => {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);

  useEffect(() => toastManager.subscribe(setToasts), []);

  return {
    topToasts: toasts.filter(item => item.position === "top"),
    bottomToasts: toasts.filter(item => item.position === "bottom"),
  };
};
