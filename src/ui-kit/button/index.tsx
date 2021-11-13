/** @jsxImportSource @emotion/react */

import React, {ButtonHTMLAttributes} from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

export const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button css={styles.blue_button} {...props}>
      {children}
    </button>
  )
};