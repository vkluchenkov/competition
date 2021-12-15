/** @jsxImportSource @emotion/react */
import React from "react";
import { Dww } from "../../components/EventDww";
import { EventsList } from "../../components/EventsList";
import { styles } from "./styles";

export const Main = () => {

  return (
    <section css={styles.section}>
      <EventsList />
      {/* <Dww /> */}
    </section>
  );
};
