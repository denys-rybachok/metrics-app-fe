import type { ReactElement } from "react";
import { useDialogContext } from "../components/Dialog/DialogContextProvider";

const useDialog = () => {
  const { openDialog, closeDialog } = useDialogContext();

  const openCustomDialog = ({
    title,
    content,
  }: {
    title: string;
    content: ReactElement;
  }) => {
    openDialog({ title, content });
  };

  return { openDialog: openCustomDialog, closeDialog };
};

export default useDialog;
