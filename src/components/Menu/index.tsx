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
      <MenuItem menuLink={"/"}>Home</MenuItem>
      <MenuItem menuLink={"#"}>Item2</MenuItem>
      <MenuItem menuLink={"#"}>Item3</MenuItem>
    </MenuSection>
    <MenuSection>
      <MenuItem menuLink={"#"}>Item1</MenuItem>
      <MenuItem menuLink={"#"}>Item2</MenuItem>
      <MenuItem menuLink={"#"}>Item3</MenuItem>
    </MenuSection>
    </nav>
  )
}
