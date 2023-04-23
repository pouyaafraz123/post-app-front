import FormBaseElement, { IBaseProps, IFormikFieldProps } from "./base";
import AutoComplete, { IDefaultProps, IMenuOption } from "../core/autoComplete";

interface IFormAutoCompleteProps {
  options: IMenuOption[];
  rootProps?: Partial<IDefaultProps>;
  onInputFieldChange?: (value: string) => void;
}

// form component for wrapping auto complete input component
function FormAutoComplete({
  onChange,
  value,
  options,
  rootProps,
  onInputFieldChange,
  ...props
}: IFormAutoCompleteProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement {...props}>
      <AutoComplete
        options={options}
        value={value}
        onChange={(v) => onChange(v)}
        onInputChange={onInputFieldChange}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export { type IMenuOption };
export default FormAutoComplete;
