import React from "react";
import { styles } from "./styles";
import clsx from "clsx";

interface ChipProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, active, onClick }) => {
  return (
    <li css={styles.chip} className={clsx({ active })} onClick={onClick}>
      {label}
    </li>
  );
};
