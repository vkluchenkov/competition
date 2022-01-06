/** @jsxImportSource @emotion/react */
import React from "react";
import { EventsList } from "../../components/EventsList";
import { useUser } from "../../store/User";
import { Login } from "../Login";
import { styles } from "./styles";

export const Main = () => {

  const [{ currentUser }, { }] = useUser();
  if (!currentUser) {
    return (
      <section css={styles.section}>
        <Login />
      </section>
    )
  }
  return (
    <section css={styles.section}>
      <EventsList />
    </section>
  );
};
