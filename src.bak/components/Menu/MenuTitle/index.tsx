/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";

export const MenuTitle: React.FC = ({ children }) => {
  return (
    <figcaption css={styles.menu_title}>
      {children}
    </figcaption>
  )
}
