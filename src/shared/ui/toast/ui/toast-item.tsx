import { useEffect, type ReactNode } from "react";
import { motion, type PanInfo } from "framer-motion";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  CheckmarkCircleFill,
  XmarkCircle,
  ExclamationmarkCircle,
} from "@b1nd/dodam-design-system/icons/mono";
import type { ToastItemData, ToastType } from "../model/toast-manager";

const ICON_SIZE = 20;
const SWIPE_THRESHOLD = 60;

const TYPE_ICONS: Record<ToastType, ReactNode> = {
  default: null,
  success: <CheckmarkCircleFill size={ICON_SIZE} color={colors.status.success} />,
  error: <XmarkCircle size={ICON_SIZE} color={colors.status.error} />,
  warning: <ExclamationmarkCircle size={ICON_SIZE} color={colors.status.warning} />,
};

type ToastItemProps = {
  item: ToastItemData;
  onRemove: () => void;
};

export const ToastItem = ({ item, onRemove }: ToastItemProps) => {
  useEffect(() => {
    if (item.duration <= 0) return;
    const timer = setTimeout(onRemove, item.duration);
    return () => clearTimeout(timer);
  }, [item.duration, onRemove]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.offset.y) > SWIPE_THRESHOLD) {
      onRemove();
    }
  };

  const icon = item.icon ?? TYPE_ICONS[item.type];
  const exitY = item.position === "top" ? -40 : 40;

  return (
    <motion.div
      drag
      dragElastic={0.5}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: exitY, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: exitY, scale: 0.9 }}
      transition={{ type: "spring", damping: 22, stiffness: 300, mass: 1 }}
      className="pointer-events-auto flex cursor-grab items-center gap-2 rounded-xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] active:cursor-grabbing"
      style={{ backgroundColor: colors.fill.primary, touchAction: "none" }}
    >
      {icon && <div className="flex shrink-0 items-center justify-center">{icon}</div>}
      <span
        className="whitespace-nowrap text-sm font-medium"
        style={{ color: colors.text.primary }}
      >
        {item.message}
      </span>
    </motion.div>
  );
};
