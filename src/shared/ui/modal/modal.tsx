import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./type";
import type { MouseEvent } from "react";

export const Modal = ({ title, children, onClose }: ModalProps) => {
  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(".app-shell__scroll");
    const previousScrollOverflow = scrollContainer?.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (scrollContainer) {
        scrollContainer.style.overflow = previousScrollOverflow ?? "";
      }
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [onClose]);

  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const titleId = useId();

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 px-5"
      onClick={handleBackgroundClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-3xl bg-white p-5 shadow-lg"
      >
        <h2 id={titleId} className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
