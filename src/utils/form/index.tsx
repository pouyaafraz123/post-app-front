import { IFormikFieldProps } from "../../components/form/base";
import { FormikProps } from "formik";

export function getFormikFieldProps<T extends { [key: string]: any }>(
  name: string,
  label: string,
  formik: FormikProps<T>
): IFormikFieldProps {
  return {
    nameId: name,
    label,
    onChange: (value: any) => formik.setFieldValue(name, value),
    // value: formik.values[name],
    value: getInnerValue(name, formik.values),
    error: formik.errors[name],
  };
}
// function that return inner value
function getInnerValue(name: string, object: object): any {
  if (Object.keys(object).length === 0) {
    return undefined;
  }
  // console.log("object: ", object);
  let extractedValue = object;
  const nameArray = name.split(".");
  if (!object.hasOwnProperty(nameArray[0])) {
    return undefined;
  }
  nameArray.forEach((element) => {
    if (extractedValue) {
      extractedValue = extractedValue[element as keyof typeof object];
    }
  });
  return extractedValue;
}
// function that generate required message for form input
export function generateRequiredMessage(name: string): string {
  return `Please enter the ${name}`;
}
