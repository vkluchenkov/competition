/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { MenuIcon } from "./MenuIcon";
import { MenuItemProps } from "./types";
import { Link } from "react-router-dom";

export const MenuItem: React.FC<MenuItemProps> = ({ children, menuLink }) => {
  return (
    <li>
      <Link to={menuLink} css={styles.menu_item}>
        <div css={styles.menu_icon}>
          {MenuIcon}
        </div>
        {children}
      </Link>
    </li>
  )
}
