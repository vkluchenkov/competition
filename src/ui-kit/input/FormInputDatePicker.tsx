import React from "react"
import { DatePicker, DatePickerProps } from "@material-ui/pickers"
import { Control, useController, UseControllerProps } from "react-hook-form"

interface FormDatePickerProps extends Omit<DatePickerProps, 'value' | 'onChange'> {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps["rules"];
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({ control, name, rules, ...props }) => {
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
    <DatePicker
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
