import clsx from "clsx";
import { EyeBold, KeyBold, UnhideBold } from "../../icons";
import React, { HTMLProps, useState } from "react";
import classes from "./styles.module.scss";

export interface IPasswordProps {
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  validation?: "error" | "success" | "warning" | "none";
  icon?: any;
  placeholder?: string;
  htmlProps?: HTMLProps<HTMLInputElement>;
  disabled?: boolean;
}

// base password input component
function Password({
  name,
  value,
  onChange,
  className,
  validation,
  placeholder,
  icon: Icon,
  htmlProps,
  disabled,
}: IPasswordProps) {
  const [visible, setVisible] = useState(false);
  // render component
  return (
    <div
      className={clsx([classes.passwordContainer, className])}
      data-validation={validation}
      data-disabled={disabled}
    >
      {!!Icon && <Icon className={classes.passwordHeadIcon} />}
      <input
        name={name}
        disabled={!!disabled}
        value={value}
        type={visible ? "text" : "password"}
        className={classes.password}
        placeholder={placeholder}
        onChange={onChange}
        data-testid="test-password"
        {...htmlProps}
      />
      {visible ? (
        <div onClick={() => setVisible((prev) => !prev)}>
          <UnhideBold className={classes.passwordTailIcon} />
        </div>
      ) : (
        <div onClick={() => setVisible((prev) => !prev)}>
          <EyeBold className={classes.passwordTailIcon} />
        </div>
      )}
    </div>
  );
}

Password.defaultProps = {
  validation: "none",
  icon: KeyBold,
  onChange: () => {},
};

export default Password;
