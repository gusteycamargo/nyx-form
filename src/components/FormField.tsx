import { FormFieldTypeMap } from "../interfaces/FormFieldTypeMap.js";
import { InputProps } from "../interfaces/InputProps.js";
import { InputRegistry } from "../tools/input-registry.js";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";

export type FormFieldProps<T extends keyof FormFieldTypeMap> = Pick<
  ControllerProps,
  "name" | "rules"
> &
  Omit<FormFieldTypeMap[T], keyof InputProps> & {
    fieldType: T;
  };

export const FormField = <T extends keyof FormFieldTypeMap>({
  fieldType,
  name,
  rules,
  ...props
}: FormFieldProps<T>) => {
  const { control } = useFormContext();

  const Component = InputRegistry.instance.getInput(fieldType);

  if (!Component) throw new Error(`FormField '${fieldType}' not found`);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={(field) => <Component {...props} {...field} />}
    />
  );
};
