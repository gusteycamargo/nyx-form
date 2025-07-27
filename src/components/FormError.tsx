import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";

export interface FormErrorProps {
  name: string;
  children: (props: { message: string }) => ReactNode;
}

export const FormError = ({ name, children }: FormErrorProps) => {
  return (
    <Controller
      name={name}
      render={({ field, formState }) => (
        <ErrorMessage
          errors={formState.errors}
          name={field.name}
          render={({ message }) => children({ message })}
        />
      )}
    />
  );
};
