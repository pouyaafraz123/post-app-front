import clsx from "clsx";
import { PropsWithChildren } from "react";
import classes from "./styles.module.scss";

export interface IFormikFieldProps {
  nameId: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  error: any;
}

export interface IFormikInnerElementProps {
  onChange: (value: any) => void;
  className: string;
  value: any;
}

export interface IBaseProps {
  label: string;
  error: string | undefined;
  nameId: string;
  className?: string;
  noPadding?: boolean;
}

// form component for wrapping input and adding title label and error label
function FormBaseElement({
  label,
  error,
  nameId,
  children,
  className,
  noPadding,
}: IBaseProps & PropsWithChildren<any>) {
  // render component
  return (
    <div
      className={clsx([
        // classes.formElementBaseContainer,
        noPadding && classes.no,
        className,
      ])}
    >
      {label && (
        <label htmlFor={nameId} className={classes.formElementLabel}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <label htmlFor={nameId} className={classes.formElementError}>
          {error}
        </label>
      )}
    </div>
  );
}

FormBaseElement.defaultProps = {
  className: "",
};

export default FormBaseElement;
