import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "../tools/FormInput.js";
import { InputProps } from "../interfaces/InputProps.js";
import { FormError } from "../components/FormError.js";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormField } from "../components/FormField.js";
import { useForm } from "react-hook-form";

interface NameProps extends InputProps {
  seila: string;
  aaa: number;
}

function Name({ name, ...props }: NameProps) {
  return (
    <>
      <input type="text" name={name} {...props} />
      <FormError name={name}>{({ message }) => <p>{message}</p>}</FormError>
    </>
  );
}

declare module "../interfaces/FormFieldTypeMap.d.ts" {
  interface FormFieldTypeMap {
    name: NameProps;
  }
}

FormInput("name", Name);

interface AgeProps extends InputProps {
  livro: string;
}

const Age = ({ name, ...props }: AgeProps) => {
  return (
    <>
      <input type="number" name={name} {...props} />
      <FormError name={name}>{({ message }) => <p>{message}</p>}</FormError>
    </>
  );
};

declare module "../interfaces/FormFieldTypeMap.d.ts" {
  interface FormFieldTypeMap {
    age: AgeProps;
  }
}

FormInput("age", Age);

const schema = z.object({
  name: z.string().min(1),
  age: z.number().min(1),
});

const meta = {
  title: "Components/DatePicker",
  component: () => {
    const form = useForm({
      resolver: zodResolver(schema),
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <FormField fieldType="name" name="name" aaa={1} seila="" />
        <FormField fieldType="age" name="age" livro="aaa" />
        <button
          type="submit"
          onClick={() => {
            form.handleSubmit(console.log)();
          }}
        >
          Submit
        </button>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
