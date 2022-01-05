/** @jsxImportSource @emotion/react */
import React from "react";
import { EventsList } from "../../components/EventsList";
import { Login } from "../Login";
import { styles } from "./styles";

export const Main = () => {

  return (
    <section css={styles.section}>
      <Login />
    </section>
  );
};
