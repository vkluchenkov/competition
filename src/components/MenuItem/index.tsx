/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";

export const MenuItem: React.FC = () => {
  const menuLink: string = "#"

  return (
    <li>
    <a href={menuLink} css={styles.menu_item}>
      <div css={styles.menu_icon}>
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
          style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%',}}>
          <path d="M4,10V21h6V15h4v6h6V10L12,3Z"></path>
         </svg>
      </div>
      Лабуда
    </a>
  </li>
  )
}
