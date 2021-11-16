/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { styles } from "./styles";
import { Chip } from "./Chip";

export const Chips: React.FC = () => {
  return (
    <ul css={styles.chips_container}>
      <li>
        <Chip active={true}>All</Chip>
      </li>
      <li>
        <Chip>Diesel show</Chip>
      </li>
      <li>
        <Chip>Gaming show</Chip>
      </li><li>
        <Chip active={true}>All</Chip>
      </li>
      <li>
        <Chip>Diesel show</Chip>
      </li>
      <li>
        <Chip>Gaming show</Chip>
      </li><li>
        <Chip active={true}>All</Chip>
      </li>
      <li>
        <Chip>Diesel show</Chip>
      </li>
      <li>
        <Chip>Gaming show</Chip>
      </li><li>
        <Chip active={true}>All</Chip>
      </li>
      <li>
        <Chip>Diesel show</Chip>
      </li>
      <li>
        <Chip>Gaming show</Chip>
      </li><li>
        <Chip active={true}>All</Chip>
      </li>
      <li>
        <Chip>Diesel show</Chip>
      </li>
      <li>
        <Chip>Gaming show</Chip>
      </li><li>
        <Chip active={true}>All</Chip>
      </li>
      <li>
        <Chip>Diesel show</Chip>
      </li>
      <li>
        <Chip>Gaming show</Chip>
      </li>
      <li css={styles.overlay}>
        {">"}
      </li>
    </ul>
  )
}
