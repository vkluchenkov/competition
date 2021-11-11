/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./login_styles";

export const Login: React.FC = () => {
  return (
    <div css={styles.login_frame}>
      <div css={styles.login_window}>
        <img src={'./images/logo.svg'} css={styles.login_logo}></img>

        <h1 css={styles.login_title}>Sign In</h1>
        <p css={styles.login_subtitle}>to continue to Best video</p>

        <form name="login" css={styles.login_form}>
          <input type="text" name="email" id="email" placeholder="Enter your email" css={styles.login_input}></input>
          <input type="password" name="password" id="password" placeholder="Enter your password" css={styles.login_input}></input>
          <a href="#" css={styles.login_link}>Forgot your email or password?</a>
        </form>

        <div css={styles.login_buttons}>
          <button type="submit" form="login" css={styles.login_button}>Sign In</button>
          <a href="#" css={styles.login_link}>Create account</a>
        </div>
      </div>
    </div>
  )
}