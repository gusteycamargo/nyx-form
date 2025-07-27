import type { FormFieldTypeMap } from "../interfaces/FormFieldTypeMap.js";

type InputComponent = React.FC<any>;

export class InputRegistry<
  T extends keyof FormFieldTypeMap = keyof FormFieldTypeMap
> {
  static #instance: InputRegistry;

  private constructor() {}

  private inputs = new Map<T, InputComponent>();

  public static get instance() {
    if (!InputRegistry.#instance) {
      InputRegistry.#instance = new InputRegistry();
    }

    return InputRegistry.#instance;
  }

  public register(type: T, component: InputComponent) {
    this.inputs.set(type, component);
  }

  public getInput(type: T) {
    return this.inputs.get(type);
  }
}
