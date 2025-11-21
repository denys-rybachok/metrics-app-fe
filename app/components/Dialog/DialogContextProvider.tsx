"use client";

import {
  createContext,
  useState,
  useContext,
  useCallback,
  type ReactElement,
  type ReactNode,
} from "react";
import DialogContainer from "./Dialog";

export interface DialogOptions {
  title: string;
  content: ReactElement;
}

interface DialogContextType {
  isOpen: boolean;
  options: DialogOptions | null;
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions | null>(null);

  const openDialog = useCallback((opts: DialogOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
  }, []);

  return (
    <DialogContext.Provider
      value={{ isOpen, options, openDialog, closeDialog }}
    >
      {children}
      <DialogContainer
        isOpen={isOpen}
        options={options}
        onClose={closeDialog}
      />
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("useDialogContext must be used within a DialogProvider");
  return context;
};
