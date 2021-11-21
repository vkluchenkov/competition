/** @jsxImportSource @emotion/react */

import React, { TextareaHTMLAttributes } from "react";
import { styles } from "./styles";
import clsx from "clsx";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ error, children, ...props }) => {
  return (
    <div>
      <textarea css={styles.textarea} {...props}></textarea>
      <p css={styles.error} className={clsx({ visible: error })}>
        {error}
      </p>
    </div>
  );
};
