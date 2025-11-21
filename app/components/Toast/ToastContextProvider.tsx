"use client";

import { ToastEnum } from "@/app/enums/toast.enum";
import type { SnackbarOrigin, SxProps } from "@mui/material";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface Toast {
  message: string;
  type?: ToastEnum;
  autoHideDuration?: number | null;
  anchorOrigin?: SnackbarOrigin;
  action?: React.ReactNode;
  sx?: SxProps;
}

export interface ToastState {
  isOpen: boolean;
  toast: Toast | null;
}

interface ToastContextType {
  toastState: ToastState;
  setToastState: Dispatch<SetStateAction<ToastState>>;
  openToast: (toast: Toast) => void;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toastState, setToastState] = useState<ToastState>({
    isOpen: false,
    toast: null,
  });

  const openToast = (toast: Toast) => {
    setToastState({ isOpen: true, toast });
  };

  const closeToast = () => {
    setToastState((prev: any) => ({ ...prev, isOpen: false }));
  };

  return (
    <ToastContext.Provider
      value={{ toastState, setToastState, openToast, closeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToastContext must be used inside ToastContextProvider");
  return ctx;
};
