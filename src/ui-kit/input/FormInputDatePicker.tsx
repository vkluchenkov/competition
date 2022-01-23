import React from "react"
import { Control, useController, UseControllerProps } from "react-hook-form"
import { DateTime } from "luxon";
import { DatePicker, DatePickerProps } from "@mui/lab";
import { TextField } from "@mui/material"
import { InputField } from ".";


type FormDatePickerProps = DatePickerProps & {
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
      defaultValue: "01.01.2000",
    }
  );

  // const formattedValue = DateTime.fromISO(value);

  return (
    <DatePicker
      {...props}
      inputFormat="dd.mm.yyyy"
      mask="__.__.____"
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField
        {...params}
        name={name}
        fullWidth
      />}
    />
  )
}
