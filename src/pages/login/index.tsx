/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { Button } from "../../ui-kit/button";
import { Input } from "../../ui-kit/input";
import { Link } from "react-router-dom";
import { useUser } from "../../store/User";

export const Login: React.FC = () => {
  const [{}, {checkCredentials}] = useUser()

  const [emailState, setEmailState] = useState('');
  const [passState, setPassState] = useState('');

  const emailHandle = (event: any) => setEmailState(event.target.value);
  const passHandle = (event: any) => setPassState(event.target.value);
  const onCLick = () => {
    checkCredentials(emailState, passState)
  }

  return (
    <div css={styles.login_frame}>
      <div css={styles.login_window}>
        <Link to="/">
          <img src={'./images/logo.svg'} css={styles.login_logo}></img>
        </Link>

        <h1 css={styles.login_title}>Sign In</h1>
        <p css={styles.login_subtitle}>to continue to Best video</p>

        <form name="login" css={styles.login_form}>
          <Input type="text" name="email" id="email" placeholder="Enter your email" value={emailState} onChange={emailHandle} />
          <Input type="password" name="password" id="password" placeholder="Enter your password" value={passState} onChange={passHandle} />
          <a href="#" css={styles.login_link}>Forgot your email or password?</a>
        </form>

        <div css={styles.login_buttons}>
          <Button type="submit" id="loginSubmit" onClick={onCLick} >Sign In</Button>
          <a href="#" css={styles.login_link}>Create account</a>
        </div>
      </div>
    </div>
  )
}