/** @jsxImportSource @emotion/react */

import React, { InputHTMLAttributes } from "react";
import { styles } from "./styles";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error, children, ...props }) => {
  return (
    <div>
      <input css={styles.input} {...props}></input>
      <p css={styles.error} className={clsx({ visible: error })}>
        {error}
      </p>
    </div>
  );
};
