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
      defaultValue: "",
    }
  );

  // const formattedValue = DateTime.fromISO(value);

  return (
    <></>
  )
}
