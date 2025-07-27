# Nyx Form

A React library for creating type-safe forms with custom input components.

## 📋 Features

- ✅ **Type-safe**: Fully typed with TypeScript
- 🎯 **Component Registry**: Registration system for custom input components
- 🔧 **React Hook Form**: Native integration with react-hook-form
- ✨ **Validation**: Support for validation with Zod and other resolvers
- 🎨 **Flexible**: Allows creation of any type of custom input

## 🚀 Installation

```bash
# With yarn
yarn add nyx-form

# With npm
npm install nyx-form

# With pnpm
pnpm add nyx-form
```

### Peer Dependencies

```bash
yarn add react-hook-form
```

## 📖 Basic Usage

### 1. Creating an Input Component

```typescript
import { FormInput } from "nyx-form";
import { FormError } from "nyx-form";
import { InputProps } from "nyx-form";

// Define the specific props for your component
interface NameInputProps extends InputProps {
  placeholder?: string;
  maxLength?: number;
}

// Create your component
function NameInput({
  name,
  value,
  onChange,
  placeholder,
  maxLength,
}: NameInputProps) {
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <FormError name={name}>
        {({ message }) => <span className="error">{message}</span>}
      </FormError>
    </>
  );
}

// Register the component in the type map
declare module "nyx-form/interfaces/FormFieldTypeMap" {
  interface FormFieldTypeMap {
    name: NameInputProps;
  }
}

// Register the component
FormInput("name", NameInput);
```

### 2. Using in Forms

```typescript
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "nyx-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "Minimum age is 18"),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          fieldType="name"
          name="name"
          placeholder="Enter your name"
          maxLength={50}
        />

        <FormField fieldType="age" name="age" min={18} max={100} />

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## 🔧 API

### FormInput

Function to register custom input components.

```typescript
FormInput<TType, TTarget>(type: TType, target: TTarget)
```

**Parameters:**

- `type`: String identifier for the input type
- `target`: React component to be registered

### FormField

Component to render form fields.

```typescript
interface FormFieldProps<T extends keyof FormFieldTypeMap> {
  fieldType: T;
  name: string;
  rules?: ValidationRules;
  // ...other type-specific props
}
```

**Props:**

- `fieldType`: Type of the registered field
- `name`: Field name in the form
- `rules`: Validation rules (optional)
- Other props specific to the registered component

### FormError

Component to display validation errors.

```typescript
interface FormErrorProps {
  name: string;
  children: (props: { message: string }) => ReactNode;
}
```

**Props:**

- `name`: Field name
- `children`: Render function to display the error message

### InputProps

Base interface that all input components should extend.

```typescript
interface InputProps<
  TFieldValues = FieldValues,
  TName = FieldPath<TFieldValues>
> extends ControllerRenderProps<TFieldValues, TName> {
  // react-hook-form Controller props
}
```

## 📝 Advanced Examples

### Select Component

```typescript
interface SelectInputProps extends InputProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

function SelectInput({
  name,
  value,
  onChange,
  options,
  placeholder,
}: SelectInputProps) {
  return (
    <>
      <select name={name} value={value} onChange={onChange}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FormError name={name}>
        {({ message }) => <div className="error-message">{message}</div>}
      </FormError>
    </>
  );
}

declare module "nyx-form/interfaces/FormFieldTypeMap" {
  interface FormFieldTypeMap {
    select: SelectInputProps;
  }
}

FormInput("select", SelectInput);
```

### Date Component

```typescript
interface DateInputProps extends InputProps {
  minDate?: string;
  maxDate?: string;
}

function DateInput({
  name,
  value,
  onChange,
  minDate,
  maxDate,
}: DateInputProps) {
  return (
    <>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        min={minDate}
        max={maxDate}
      />
      <FormError name={name}>
        {({ message }) => <small className="text-red-500">{message}</small>}
      </FormError>
    </>
  );
}

declare module "nyx-form/interfaces/FormFieldTypeMap" {
  interface FormFieldTypeMap {
    date: DateInputProps;
  }
}

FormInput("date", DateInput);
```

## 🎯 Type Safety

nyx-form uses module augmentation to ensure type safety. When you register a new input type, it becomes automatically available in IntelliSense:

```typescript
// ✅ Autocomplete works
<FormField fieldType="name" name="userName" placeholder="..." />

// ❌ Type error if using incorrect props
<FormField fieldType="name" name="userName" invalidProp="..." />
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🔗 Useful Links

- [React Hook Form](https://react-hook-form.com/)
