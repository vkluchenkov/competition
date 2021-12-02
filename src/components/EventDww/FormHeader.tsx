/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import { styles } from "./styles";

interface FormHeaderProps {
  userData: {
    firstName: string;
    lastName: string;
    age: number;
  };
  ageGroup: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ userData, ageGroup }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" css={styles.headerMargin} >
        {t('Dww.title')}
      </Typography>

      <Typography variant="h5" component="h2" css={styles.headerMargin}>
        {t('Dww.subtitle')}
      </Typography>

      {/* Визуализация для тестирования */}
      <Typography variant="body1">
        Participant name : <strong>{userData.firstName} {userData.lastName}</strong>
      </Typography>
      <Typography variant="body1" css={styles.headerMargin}>
        Age group: <strong>{ageGroup}</strong>
      </Typography>

      {/* Счетчик для юзера, пока не придумал как красивее сделать */}
      <Typography variant="h5" component="p" css={styles.headerMargin}>
        Current Total: <strong>€ { }</strong>
      </Typography>
    </React.Fragment>
  )
}