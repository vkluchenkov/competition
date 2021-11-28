import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export type InputFieldProps = TextFieldProps & {

}

export const InputField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
    />
  )
}