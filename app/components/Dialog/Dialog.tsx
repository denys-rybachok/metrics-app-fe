import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { DialogOptions } from "./DialogContextProvider";

const DialogContainer = ({
  isOpen,
  options,
  onClose,
}: {
  isOpen: boolean;
  options: DialogOptions | null;
  onClose: () => void;
}) => {
  if (!options) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {options.title && (
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {options.title}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent dividers>{options.content}</DialogContent>
    </Dialog>
  );
};

export default DialogContainer;
