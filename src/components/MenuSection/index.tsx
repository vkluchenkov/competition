/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { MenuItem } from "../MenuItem";

export const MenuSection: React.FC = () => {
  const MenuTitle: string = "Меню раздела"
  return (
    <figure css={styles.menu_section}>
      <figcaption css={styles.menu_title}>
        {MenuTitle}
      </figcaption>
      <ul css={styles.menu_list}>
        <MenuItem />
        <MenuItem />
      </ul>
    </figure>
  )
}
