/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { MenuSection } from "../MenuSection";

export const Menu: React.FC = () => {
  return (
    <nav css={styles.menu}>
      <MenuSection />
    </nav>
  )
}
