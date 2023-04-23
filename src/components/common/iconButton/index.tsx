import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import classes from "./styles.module.scss";

interface IButtonDefaultProps extends PropsWithChildren<any> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon: any;
  children?: any;
  type?: "button" | "submit" | "reset";
  size?: "big" | "normal" | "small";
  disabled?: boolean;
}

interface IIconButtonColorProps {
  color?: "success" | "error" | "warning";
}

interface IIconButtonVariantProps {
  color?: "primary" | "secondary";
  variant?: "outlined" | "text" | "contained" | "transparent";
}
// button component with icon inside
function IconButton({
  onClick,
  variant,
  icon: Icon,
  color,
  className,
  type,
  size,
  disabled,
  ...props
}: IButtonDefaultProps & (IIconButtonColorProps | IIconButtonVariantProps)) {
  // render component
  return (
    <button
      data-testid="test-icon-button"
      className={clsx([classes.iconButton, className])}
      onClick={onClick}
      type={type}
      data-variant={variant}
      data-color={color}
      data-size={size}
      disabled={disabled}
      {...props}
    >
      {Icon && (
        <Icon data-testid="test-icon-button-icon" className={classes.icon} />
      )}
    </button>
  );
}

IconButton.defaultProps = {
  variant: "contained",
  color: "primary",
  type: "button",
  size: "normal",
  disabled: false,
};

export default IconButton;
