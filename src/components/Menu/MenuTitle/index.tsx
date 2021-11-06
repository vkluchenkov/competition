/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";

export const MenuTitle: React.FC = () => {
  const title: string = "Меню раздела"
  return (
    <figcaption css={styles.menu_title}>
      {title}
    </figcaption>
  )
}
