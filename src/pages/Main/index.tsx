/** @jsxImportSource @emotion/react */
import React from "react";
import { EventsList } from "../../components/EventsList";
import { styles } from "./styles";

export const Main = () => {

  return (
    <section css={styles.section}>
      <EventsList />
    </section>
  );
};
