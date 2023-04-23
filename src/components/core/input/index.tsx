import clsx from "clsx";
import classes from "./styles.module.scss";
import React, { HTMLProps } from "react";

export interface IInputDefaultProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  icon?: any;
  size?: "small" | "normal" | "big";
  disabled?: boolean;
  htmlProps?: HTMLProps<HTMLInputElement>;
  type?: "text" | "number";
  validation?: "error" | "success" | "warning" | "none";
}

// simple base input component
const Input = React.forwardRef<HTMLInputElement, IInputDefaultProps>(
  (outProps, ref) => {
    const {
      name,
      value,
      onChange,
      onKeyDown,
      type,
      className,
      placeholder,
      icon: Icon,
      size,
      disabled,
      htmlProps,
      ...props
    } = outProps;
    // gray-very-light
    // render component
    return (
      <div
        className={clsx([classes.inputContainer, className])}
        data-variant={"textnumber"}
        data-validation={"validation" in props ? props.validation : "none"}
        data-size={size}
        data-disabled={disabled}
        data-color={"white"}
      >
        <input
          name={name}
          value={value}
          className={classes.input}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          data-testid="test-input"
          disabled={disabled}
          {...htmlProps}
          ref={ref}
        />
      </div>
    );
  }
);

Input.defaultProps = {
  type: "text",
  validation: "none",
  icon: undefined,
  onChange: () => {},
  onKeyDown: () => {},
  size: "big",
  disabled: false,
  htmlProps: {},
};

export default Input;
