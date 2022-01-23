import React from "react"
import { Control, useController, UseControllerProps } from "react-hook-form"
import { DateTime } from "luxon";
import { DatePicker, DatePickerProps } from "@mui/lab";
import { InputField } from ".";


interface FormDatePickerProps extends Omit<DatePickerProps, "value" | "onChange" | "renderInput"> {
  control: Control<any>;
  name: string;
  rules?: UseControllerProps["rules"];
  error: any;
  helperText: string;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({ control, name, rules, error, helperText, ...props }) => {
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

  const formattedValue = DateTime.fromISO(value);

  return (
    <DatePicker
      {...props}
      inputFormat="dd.MM.yyyy"
      value={formattedValue.isValid ? formattedValue : null}
      onChange={(date: any) => onChange(date.toISODate())}
      views={['year', 'month', 'day']}
      renderInput={(params) => <InputField
        {...params}
        required={!!rules?.required}
        name={name}
        error={error}
        onBlur={onBlur}
        helperText={helperText}
        InputProps={{
          ...params.InputProps,
          required: false,
        }}
        fullWidth
      />}
    />
  )
}
