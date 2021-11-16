/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import clsx from "clsx";

interface ChipProps {
  active?: boolean
}

export const Chip: React.FC<ChipProps> = ({ children, active }) => {
  return (
    <div
      css={styles.chip}
      className={clsx({active: active})}
    >
      {children}
    </div>
  )
}
