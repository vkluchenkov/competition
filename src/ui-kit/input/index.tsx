/** @jsxImportSource @emotion/react */

import React, { InputHTMLAttributes } from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({
  children,
  ...props
}) => {
 return (
  <input css={styles.login_input} {...props}></input>
 )
}