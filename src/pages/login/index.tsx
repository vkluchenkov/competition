/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { styles } from "./styles";
import { Button } from "../../ui-kit/button";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../store/User";
import qs from "query-string";
import logo from "../../images/logo.svg"

export const Login: React.FC = () => {
  return (
    <div></div>

  )
  // const currentUrl = useLocation();
  // const parsedUrl = qs.parse(currentUrl.search);
  // const navigate = useNavigate();

  // const mustBeString = (value: any): value is string => {
  //   if (typeof value !== 'string') {
  //     throw new Error('Thats not a string')
  //   }
  //   return true;
  // }

  // const [{ currentUser }, { checkCredentials }] = useUser();

  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [error, setError] = useState("");

  // const emailHandle = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  // const passHandle = (event: React.ChangeEvent<HTMLInputElement>) => setPass(event.target.value);

  // const formSubmit = (event: any) => {
  //   event.preventDefault();
  //   try {
  //     checkCredentials(email, pass);
  //     if (mustBeString(parsedUrl.redirect)) {
  //       navigate(parsedUrl.redirect)
  //     }
  //   } catch (error: any) {
  //     setError(error.message);
  //   }
  // };

  // if (!currentUser) {
  //   return (
  //     <div css={styles.login_frame}>
  //       <div css={styles.login_window}>
  //         <Link to="/">
  //           <img
  //             src={logo}
  //             css={styles.login_logo}
  //             alt="logo"
  //           ></img>
  //         </Link>

  //         <h1 css={styles.login_title}>Sign In</h1>
  //         <p css={styles.login_subtitle}>to continue to Best video</p>

  //         <form id="login" css={styles.login_form} onSubmit={formSubmit}>
  //           <Input
  //             type="text"
  //             name="email"
  //             id="email"
  //             placeholder="Enter your email"
  //             value={email}
  //             onChange={emailHandle}
  //             error={error}
  //           />
  //           <Input
  //             type="password"
  //             name="password"
  //             id="password"
  //             placeholder="Enter your password"
  //             value={pass}
  //             onChange={passHandle}
  //           />

  //           <a href="#" css={styles.login_link}>
  //             Forgot your email or password?
  //           </a>
  //           <div css={styles.login_buttons}>
  //             <Button type="submit" id="loginSubmit">
  //               Sign In
  //             </Button>
  //             <a href="#" css={styles.login_link}>
  //               Create account
  //             </a>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div css={styles.login_frame}>
  //       <div css={styles.login_window}>
  //         <Link to="/">
  //           <img
  //             src={"./images/logo.svg"}
  //             css={styles.login_logo}
  //             alt="logo"
  //           ></img>
  //         </Link>
  //         <h1 css={styles.login_title}>Hi {currentUser.username}!</h1>
  //         <p css={styles.login_subtitle}>Nice to see you again</p>
  //       </div>
  //     </div>
  //   );
  // }
};
