import clsx from "clsx";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import classes from "./styles.module.scss";
import BeatLoader from "react-spinners/BeatLoader";

interface IButtonDefaultProps extends PropsWithChildren<any> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: any;
  children?: any;
  type?: "button" | "submit" | "reset";
  size?: "big" | "normal" | "small";
  rootAttributes?: HTMLAttributes<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
}

interface IButtonColorProps {
  color?: "success" | "error" | "warning";
}

interface IButtonVariantProps {
  color?: "primary" | "secondary";
  variant?:
    | "outlined"
    | "text"
    | "contained"
    | "transparent"
    | "error-contained"
    | "outlined_no_hover";
}

export type TButtonProps = IButtonDefaultProps &
  (IButtonColorProps | IButtonVariantProps);

// base button component
function Button({
  onClick,
  children,
  variant,
  icon: Icon,
  color,
  className,
  type,
  size,
  disabled,
  rootAttributes,
  isLoading,
}: TButtonProps) {
  // render component
  return (
    <button
      data-testid="test-button"
      className={clsx([classes.button, className])}
      onClick={onClick}
      type={type}
      data-variant={variant}
      data-color={color}
      data-size={size}
      disabled={disabled || isLoading}
      {...rootAttributes}
    >
      {/* TODO: Create wrapper components for every icon and handle fill and stroke inside them */}
      {isLoading && (
        <div className="d-flex mt-2">
          <BeatLoader color="#fff" size={10} margin={2} />
        </div>
      )}
      {Icon && <Icon data-testid="test-button-icon" className={classes.icon} />}
      {!isLoading && children}
    </button>
  );
}

Button.defaultProps = {
  variant: "contained",
  color: "primary",
  type: "button",
  size: "normal",
  disabled: false,
};

export default Button;
