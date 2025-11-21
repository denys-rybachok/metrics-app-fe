"use client";

import { useToastContext } from "./ToastContextProvider";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastEnum } from "@/app/enums/toast.enum";
import { colorConfigurator } from "@/app/constants/colorConfigurator";

const styles = { fontSize: 14, minWidth: "auto" };
const AUTOHIDE_DURATION = 5000;
const CLICKAWAY_ACTION = "clickaway";

const getBackgroundByToastType = (type?: ToastEnum): string => {
  switch (type) {
    case ToastEnum.Error:
      return colorConfigurator.error;
    case ToastEnum.Success:
      return colorConfigurator.success;
    case ToastEnum.Warning:
      return colorConfigurator.warning;
    case ToastEnum.Info:
      return colorConfigurator.primary;
    default:
      return colorConfigurator.primary;
  }
};

const Toast = () => {
  const { toastState, closeToast } = useToastContext();
  const { isOpen, toast } = toastState;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === CLICKAWAY_ACTION) return;
    closeToast();
  };

  const action = (
    <IconButton onClick={closeToast} aria-label="close">
      <CloseIcon sx={{ color: "#fff" }} />
    </IconButton>
  );

  const sx = {
    "& .MuiSnackbarContent-root": {
      ...styles,
      zIndex: 9999,
      background: toast?.type && getBackgroundByToastType(toast.type),
    },
    "& .MuiSnackbarContent-message": { maxWidth: "90%" },
    ...(toast?.sx || {}),
  };

  return (
    <Snackbar
      open={isOpen}
      message={toast?.message}
      autoHideDuration={
        toast?.autoHideDuration || toast?.autoHideDuration === null
          ? toast?.autoHideDuration
          : AUTOHIDE_DURATION
      }
      onClose={handleClose}
      anchorOrigin={
        toast?.anchorOrigin || { vertical: "top", horizontal: "center" }
      }
      action={toast?.action || action}
      sx={sx}
    />
  );
};

export default Toast;
