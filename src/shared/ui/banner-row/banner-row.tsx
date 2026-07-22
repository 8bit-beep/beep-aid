import type { ButtonHTMLAttributes, ReactNode } from "react";

type BannerRowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  trailing?: ReactNode;
};

export const BannerRow = ({ label, trailing, ...props }: BannerRowProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-lg bg-white p-5 text-left shadow-sm"
      {...props}
    >
      <span className="text-base font-medium text-gray-900">{label}</span>
      {trailing}
    </button>
  );
};
