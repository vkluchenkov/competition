/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { Button } from "../../ui-kit/button";
import { Input } from "../../ui-kit/input";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  return (
    <div css={styles.login_frame}>
      <div css={styles.login_window}>
        <Link to="/">
          <img src={'./images/logo.svg'} css={styles.login_logo}></img>
        </Link>

        <h1 css={styles.login_title}>Sign In</h1>
        <p css={styles.login_subtitle}>to continue to Best video</p>

        <form name="login" css={styles.login_form}>
          <Input type="text" name="email" id="email" placeholder="Enter your email" />
          <Input type="password" name="password" id="password" placeholder="Enter your password" />
          <a href="#" css={styles.login_link}>Forgot your email or password?</a>
        </form>

        <div css={styles.login_buttons}>
          <Button type="submit" id="loginSubmit">Sign In</Button>
          <a href="#" css={styles.login_link}>Create account</a>
        </div>
      </div>
    </div>
  )
}