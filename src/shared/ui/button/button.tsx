import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { BRAND_COLOR, DANGER_COLOR } from "@/shared/config/colors";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const VARIANT_STYLE: Record<ButtonVariant, CSSProperties> = {
  primary: { backgroundColor: BRAND_COLOR, color: "#fff" },
  secondary: { borderWidth: 1, borderStyle: "solid", borderColor: BRAND_COLOR, color: BRAND_COLOR },
  danger: { backgroundColor: DANGER_COLOR, color: "#fff" },
};

export const Button = ({ variant = "primary", className = "", style, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex-1 rounded-medium py-3 text-sm font-semibold ${className}`}
      style={{ ...VARIANT_STYLE[variant], ...style }}
      {...props}
    />
  );
};
