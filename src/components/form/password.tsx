import FormBaseElement, { IBaseProps, IFormikFieldProps } from "./base";
import Password, { IPasswordProps } from "../core/password";

interface IFormPasswordProps {
  rootProps?: Partial<IPasswordProps>;
}

// form component for wrapping password input component
function FormPassword({
  onChange,
  value,
  rootProps,
  ...props
}: IFormPasswordProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement {...props}>
      <Password
        value={value}
        onChange={(e) => onChange(e.target.value)}
        validation={props.error ? "error" : "none"}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export default FormPassword;
