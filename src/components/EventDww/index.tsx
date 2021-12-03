/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { Button, Typography, Box, Paper, Avatar, CircularProgress, Stepper, Step, StepLabel, StepContent, FormControl, FormLabel, FormControlLabel, Switch, Radio, RadioGroup } from "@mui/material";
import { StylesProvider } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { useForm, SubmitHandler, useFormContext, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LangSwitch } from "../langSwitch";
import { AgeGroup } from "./AgeGroup";
import { styles } from "./styles"
import { FormHeader } from "./FormHeader"
import { EventsList } from "./EventsList"

// Заполнить для обработчика формы?
interface FormFields {
  email: string,
  password: string
}

// Мок юзера
const userData = {
  firstName: "Ivan",
  lastName: "Ivanov",
  age: 18,
}

export const Dww: React.FC = () => {
  const { t } = useTranslation();
  const ageGroup = useMemo(() => AgeGroup(userData.age), [userData.age]);

  return (
    // <StylesProvider injectFirst>
    <EventsList />
    // </StylesProvider> 
  );
};
