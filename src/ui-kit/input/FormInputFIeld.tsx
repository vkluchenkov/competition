import React from "react";
import { Control, useController, UseControllerProps } from "react-hook-form"
import { InputField, InputFieldProps } from "./InputFIeld";

type FormInputFieldProps = InputFieldProps & {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps["rules"];
}

export const FormInputField: React.FC<FormInputFieldProps> = ({ control, name, rules, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
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
      {...props}
      required={!!rules?.required}
      fullWidth
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
      InputProps={{ required: false }}
    />
  )
}