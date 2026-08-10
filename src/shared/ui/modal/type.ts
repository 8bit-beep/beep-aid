import type { ReactNode } from "react";

export type ModalProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly onClose : () => void;
};