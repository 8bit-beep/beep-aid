import { useEffect, useId } from "react";
import type { ModalProps } from "./type";
import type { MouseEvent } from "react";

export const Modal = ({ title, children, onClose }: ModalProps) => {

  useEffect(() => {
    const handlekeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
  
    window.addEventListener("keydown", handlekeyDown)
  
    return () => {
      window.removeEventListener("keydown", handlekeyDown)
    }
  }, [onClose])
  
  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const titleId = useId();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5"
      onClick={handleBackgroundClick}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-3xl bg-white p-5 shadow-lg">
        <h2 id={titleId} className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
        <div className="mt-6"> {children} </div>
        
      </div>
    </div>
  );
}
















