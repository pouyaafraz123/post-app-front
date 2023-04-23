import { ToastContainerProps } from "react-toastify/dist/types";

export const TOAST_PROPS: ToastContainerProps = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
  toastStyle: { zIndex: 99999999 },
  style: { zIndex: 99999999 },
  bodyStyle: { zIndex: 99999999 },
};
