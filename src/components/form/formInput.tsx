import Input, { IInputDefaultProps } from "../core/input";
import FormBaseElement, { IBaseProps, IFormikFieldProps } from "./base";

interface IFormInputProps {
  rootProps?: Partial<IInputDefaultProps>;
}

// form component for wrapping basic input component
function FormInput({
  onChange,
  value,
  rootProps,
  ...props
}: IFormInputProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement {...props}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        validation={props.error && "error"}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export default FormInput;
