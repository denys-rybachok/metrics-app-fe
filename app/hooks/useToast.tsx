import { useToastContext } from "../components/Toast/ToastContextProvider";
import { ToastEnum } from "../enums/toast.enum";

const useToast = () => {
  const { openToast } = useToastContext();

  const showSystemError = () => {
    openToast({ message: "System has some error", type: ToastEnum.Error });
  };

  const showSuccess = (message: string) => {
    openToast({ message, type: ToastEnum.Success });
  };

  const showCustomError = (message: string) => {
    openToast({ message, type: ToastEnum.Error });
  };

  return { showSystemError, showSuccess, showCustomError };
};

export default useToast;
