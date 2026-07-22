import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { BRAND_COLOR } from "@/shared/config/colors";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const VARIANT_STYLE: Record<ButtonVariant, CSSProperties> = {
  primary: { backgroundColor: BRAND_COLOR, color: "#fff" },
  secondary: { borderWidth: 1, borderStyle: "solid", borderColor: BRAND_COLOR, color: BRAND_COLOR },
};

export const Button = ({ variant = "primary", className = "", style, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex-1 rounded-lg py-3 text-sm font-semibold ${className}`}
      style={{ ...VARIANT_STYLE[variant], ...style }}
      {...props}
    />
  );
};
