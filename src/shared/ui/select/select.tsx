import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon } from "@/shared/ui/chevron-down-icon";
import type { SelectItem } from "./type";

type SelectProps = {
  readonly items: SelectItem[];
  readonly value: string;
  readonly onSelectedItemChange: (item: SelectItem) => void;
};

const OPTION_HEIGHT = 32;
const PADDING = 8;
const MAX_HEIGHT = 200;
const GAP = 4;

type ListPosition = {
  top: number;
  left: number;
  width: number;
};

export const Select = ({ items, value, onSelectedItemChange }: SelectProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listPosition, setListPosition] = useState<ListPosition | null>(null);
  const optionsCount = items.length;

  const calculatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const optionsHeight = Math.min(optionsCount * OPTION_HEIGHT + PADDING, MAX_HEIGHT);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropUp = spaceBelow < optionsHeight && spaceAbove > spaceBelow;

    setListPosition({
      top: dropUp ? rect.top - optionsHeight - GAP : rect.bottom + GAP,
      left: rect.left,
      width: rect.width,
    });
  }, [optionsCount]);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    calculatePosition();
    setIsOpen(true);
  };

  const handleItemClick = (item: SelectItem) => {
    setIsOpen(false);
    onSelectedItemChange(item);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      const eventPath = event.composedPath();
      const trigger = triggerRef.current;
      const list = listRef.current;

      if (trigger && eventPath.includes(trigger)) return;
      if (list && eventPath.includes(list)) return;

      setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleLayoutChange = () => calculatePosition();
    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("scroll", handleLayoutChange, true);
    return () => {
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("scroll", handleLayoutChange, true);
    };
  }, [isOpen, calculatePosition]);

  const selectedName = items.find(item => item.value === value)?.name ?? value;

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900"
      >
        <span>{selectedName}</span>
        <span
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDownIcon />
        </span>
      </button>
      {isOpen &&
        listPosition &&
        createPortal(
          <div
            ref={listRef}
            role="listbox"
            className="max-h-[200px] overflow-y-auto rounded-xl bg-white p-1 shadow-lg"
            style={{
              position: "fixed",
              top: listPosition.top,
              left: listPosition.left,
              width: listPosition.width,
              zIndex: 1200,
            }}
          >
            {items.map(item => (
              <button
                type="button"
                role="option"
                aria-selected={item.value === value}
                key={item.value}
                onClick={() => handleItemClick(item)}
                className={`block w-full cursor-pointer rounded-lg px-2 py-1.5 text-left text-sm hover:bg-gray-100 ${
                  item.value === value ? "font-semibold text-gray-900" : "text-gray-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};
