/** @jsxImportSource @emotion/react */
import React from "react";
import { styles } from "./styles";

export const MenuSection: React.FC = ({ children }) => {
  return (
    <figure css={styles.menu_section}>
      <ul css={styles.menu_list}>{children}</ul>
    </figure>
  );
};
