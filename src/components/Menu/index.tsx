/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { MenuSection } from "./MenuSection";
import { MenuTitle } from "./MenuTitle";
import { MenuItem } from "./MenuItem";

export const Menu: React.FC = () => {
  return (
    <nav css={styles.menu}>
     <MenuSection>
      <MenuTitle>Title</MenuTitle>
      <MenuItem>Item1</MenuItem>
      <MenuItem>Item2</MenuItem>
      <MenuItem>Item3</MenuItem>
    </MenuSection>
    </nav>
  )
}
