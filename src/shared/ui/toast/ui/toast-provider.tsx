import { AnimatePresence } from "framer-motion";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";
import { toastManager, type ToastItemData, type ToastPosition } from "../model/toast-manager";
import { useToasts } from "../model/use-toasts";
import { ToastItem } from "./toast-item";

export const ToastProvider = () => {
  const { top, bottom } = useSafeArea();
  const { topToasts, bottomToasts } = useToasts();

  const renderToasts = (items: ToastItemData[], position: ToastPosition) => (
    <div
      className={`pointer-events-none fixed left-0 right-0 z-[9999] flex items-center gap-2 ${
        position === "top" ? "flex-col" : "flex-col-reverse"
      }`}
      style={position === "top" ? { top: top + 8 } : { bottom: bottom + 8 }}
    >
      <AnimatePresence>
        {items.map(item => (
          <ToastItem key={item.id} item={item} onRemove={() => toastManager.hide(item.id)} />
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {renderToasts(topToasts, "top")}
      {renderToasts(bottomToasts, "bottom")}
    </>
  );
};
