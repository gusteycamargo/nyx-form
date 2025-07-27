import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

export interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerRenderProps<TFieldValues, TName> {}
