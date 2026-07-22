import type { CSSProperties } from "react";

export const maskIconStyle = (iconUrl: string, color: string): CSSProperties => {
  const maskImage = `url("${iconUrl}")`;

  return {
    backgroundColor: color,
    WebkitMaskImage: maskImage,
    maskImage,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  } as CSSProperties;
};
