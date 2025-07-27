import type { FormFieldTypeMap } from "../interfaces/FormFieldTypeMap.d.ts";
import { InputRegistry } from "./input-registry.js";

export function FormInput<
  TType extends keyof FormFieldTypeMap,
  TTarget extends React.FC<any>
>(type: TType, target: TTarget) {
  InputRegistry.instance.register(type, target);

  return target;
}
