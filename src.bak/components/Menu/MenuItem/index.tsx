/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { MenuIcon } from "./MenuIcon";
import { MenuItemProps } from "./types";

export const MenuItem: React.FC<MenuItemProps> = ({ children }, menuLink) => {
  return (
    <li>
      <a href={menuLink} css={styles.menu_item}>
        <div css={styles.menu_icon}>
          {MenuIcon}
        </div>
        {children}
      </a>
    </li>
  )
}
