/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";

export const Header: React.FC = () => {
  return (
    <header css={styles.header}>
      <div css={styles.header_section}>
        <button css={styles.header_button}>
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
            style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%',}}>
            <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
          </svg>
        </button>
        <img css={styles.header_logo} src='./images/logo.svg'></img>
      </div>

      <div css={styles.header_section}>
        <input css={styles.header_search_input} placeholder="Поиск" type="text" name="search" id="search"></input>

        <button css={styles.header_button}>
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
            style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%',}}>
            <path
              d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z">
            </path>
          </svg>
        </button>
      </div>

      <div css={styles.header_section}>
        <button css={styles.header_button}>
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
            style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%',}}>
            <path
              d="M16,4v4h4V4H16z M19,7h-2V5h2V7z M16,10v4h4v-4H16z M19,13h-2v-2h2V13z M10,4v4h4V4H10z M13,7h-2V5h2V7z M10,10v4h4v-4H10z M13,13h-2v-2h2V13z M16,16v4h4v-4H16z M19,19h-2v-2h2V19z M10,16v4h4v-4H10z M13,19h-2v-2h2V19z M4,4v4h4V4H4z M7,7H5V5h2V7z M4,10 v4h4v-4H4z M7,13H5v-2h2V13z M4,16v4h4v-4H4z M7,19H5v-2h2V19z">
            </path>
          </svg>
        </button>

        <button css={styles.header_button}>
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
            style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%',}}>
            <path
              d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z">
            </path>
          </svg>
        </button>
      </div>
    </header>
  )
}