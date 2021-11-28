import React from "react";
import { Control, useController, UseControllerProps } from "react-hook-form"
import { InputField, InputFieldProps } from "./InputFIeld";

type FormInputFieldProps = InputFieldProps & {
  control: Control;
  name: string;
  rules: UseControllerProps["rules"]
}

export const FormInputField: React.FC<FormInputFieldProps> = ({ control, name, rules }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid }
  } = useController(
    {
      name,
      control,
      rules: rules,
      defaultValue: "",
    }
  );

  return (
    <InputField
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
    />
  )
}