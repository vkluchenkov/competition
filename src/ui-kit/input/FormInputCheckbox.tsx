import React from "react";
import { Control, useController, UseControllerProps } from "react-hook-form"
import { InputCheckbox, InputCheckboxProps } from "./InputCheckbox"

type FormInputCheckboxProps = InputCheckboxProps & {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps["rules"];
}

export const FormInputCheckbox: React.FC<FormInputCheckboxProps> = ({ control, name, rules, ...props }) => {
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
    <InputCheckbox
      {...props}
      required={!!rules?.required}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
    />
  )
}