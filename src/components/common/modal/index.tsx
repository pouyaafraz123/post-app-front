import React, { PropsWithChildren, useEffect, useState } from "react";
import IconButton from "../iconButton";
import classes from "./styles.module.scss";
import useDraggable from "../../../hooks/useDraggable";
import { CloseLinear } from "../../icons";

/** Modal Component Props */
export interface IModalProps extends PropsWithChildren<any> {
  open: boolean;
  backdrop?: boolean;
  draggable?: boolean;
  /** Title for the modal header (optional) */
  title?: string;
  onClose?: () => void;
}

// basic modal container element
function Modal({
  open,
  children,
  backdrop,
  title,
  draggable = false,
  onClose,
}: IModalProps) {
  const [localOpen, setLocalOpen] = useState(false);

  /** Custom hook for getting draggable modal */
  const [ref, position, isDragging] = useDraggable<HTMLDivElement>();

  // handle modal
  useEffect(() => {
    let timeout: any;

    if (open && !localOpen) {
      document.body.style.top = `-${document.documentElement.scrollTop}px`;
      setLocalOpen(true);
      if (
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight
      ) {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.overflowY = "scroll";
      }
    } else if (!open && localOpen) {
      timeout = setTimeout(() => {
        setLocalOpen(false);
        document.body.style.overflowY = "unset";
        document.body.style.position = "static";
        document.documentElement.style.scrollBehavior = "auto";
        const prevScrollTop = parseInt(document.body.style.top.split("p")[0]);
        document.documentElement.scrollTop = -prevScrollTop;
        document.documentElement.style.removeProperty("scroll-behavior");
        document.body.style.removeProperty("top");
      }, 200);
    }

    return () => timeout && clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  // render component

  return (
    <div className={classes.modalRoot} data-open={localOpen}>
      <div
        className={classes.modal}
        data-open={open}
        data-local-open={localOpen}
        data-backdrop={!!backdrop}
      >
        <div
          className={classes.modal__body}
          data-draggable={draggable}
          {...(draggable && {
            ref,
            style: {
              position: "absolute",
              left: position.x,
              top: position.y,
              cursor: isDragging ? "move" : "default",
            },
          })}
        >
          <div className={classes.modal__header}>
            <span className={classes.modal__title}> {title}</span>

            <IconButton variant="text" icon={CloseLinear} onClick={onClose} />
          </div>
          <div className={classes.modal__content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  backdrop: true,
};

export default Modal;
