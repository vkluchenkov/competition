/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box, Paper, Avatar, CircularProgress, Stepper, Step, StepLabel, StepContent, FormControl, FormLabel, FormControlLabel, Switch, Radio, RadioGroup } from "@mui/material";
import { Grid } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputField } from "../../ui-kit/input";
import { useTranslation } from "react-i18next";
import { LangSwitch } from "../langSwitch";

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

// Базовые цены от которых считаем
const basePrices = {
  fullPass: 199,
  wsStars: 50,
  wsOther: 40,
}

export const Dww: React.FC = () => {
  // Стейты полей
  const [isWorkshops, setIsWorkshops] = useState(false);
  const [isCompetition, setIsCompetition] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isFullPass, setIsFullPass] = useState(false);

  const isWorkshopsHandler = (event: React.ChangeEvent<HTMLInputElement>) => setIsWorkshops(event.target.checked);
  const isCompetitionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setIsCompetition(event.target.checked);
  const isShowHandler = (event: React.ChangeEvent<HTMLInputElement>) => setIsShow(event.target.checked);
  const isSingleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isFullPass) {
      setTotal(total - basePrices.fullPass);
    }
    setIsFullPass(!event.target.checked)
  };

  const isFullPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(total + basePrices.fullPass);
    setIsFullPass(event.target.checked);
  };

  // Общая сумма регистрации
  const [total, setTotal] = useState(0);

  // Возрастные группы
  const calcAgeGroup = (age: number) => {
    if (age <= 8) { return "baby" }
    if (age <= 12) { return "kids" }
    if (age <= 17) { return "juniors" }
    if (age <= 39) { return "adults" }
    if (age > 39) { return "adults" }
  }
  const ageGroup = calcAgeGroup(userData.age);

  const { t } = useTranslation();

  const { handleSubmit, control, reset, setError, formState: { errors } } = useForm<FormFields>();

  const onSubmit = handleSubmit(async (values) => {
    try {
      //     await checkUser({ variables: { email: values.email, password: values.password } });
    } catch (error: any) {
      //     setError("email", {
      //       type: "manual",
      //       message: error.message,
      //     });
    }
  });

  // Обработка шагов формы
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: "100%",
        maxWidth: 850,
      }}>
      <Paper
        elevation={3}
        sx={{
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}>

        <Typography variant="h3" component="h1" gutterBottom>
          {t('Dww.title')}
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>
          {t('Dww.subtitle')}
        </Typography>

        {/* Визуализация для тестирования */}
        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          Participant name : <strong>{userData.firstName} {userData.lastName}</strong>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          Age group: <strong>{ageGroup}</strong>
        </Typography>

        {/* Счетчик для юзера, пока не придумал как красивее сделать */}
        <Typography variant="h3" component="p" gutterBottom sx={{ mb: 2 }}>
          Current Total: <strong>€ {total}</strong>
        </Typography>

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ width: "100%" }}
        >
          <Step>
            <StepLabel>
              <Typography variant="caption">{t('Dww.step1Label')}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1">
                {t('Dww.step1Title')}
              </Typography>

              <Grid container spacing={2}>
                <Grid item >
                  <FormControlLabel
                    control={
                      <Switch onChange={isWorkshopsHandler} checked={isWorkshops} />
                    }
                    label={<span>{t('Dww.workshops')}</span>} />
                </Grid>
                <Grid item >
                  <FormControlLabel control={
                    <Switch onChange={isCompetitionHandler} checked={isCompetition} />
                  }
                    label={<span>{t('Dww.competition')}</span>} />
                </Grid>
                <Grid item >
                  <FormControlLabel control={
                    <Switch onChange={isShowHandler} checked={isShow} />
                  }
                    label={<span>{t('Dww.worldShow')}</span>} />
                </Grid>
              </Grid>

              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {t('Dww.nextBtn')}
                </Button>

              </div>
            </StepContent>
          </Step>
          <Step hidden={!isWorkshops}>
            <StepLabel>
              <Typography variant="caption">{t('Dww.workshops')}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1">
                {t('Dww.step2Title')}
              </Typography>

              <Grid container spacing={2}>
                <Grid item >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{t('Dww.step2RadioTitle')} </FormLabel>
                    <RadioGroup row name="row-radio-buttons-group">
                      <FormControlLabel
                        value={basePrices.fullPass}
                        control={<Radio onChange={isFullPassHandler} />}
                        label={<span>{t('Dww.fullPass')} €{basePrices.fullPass}</span>}
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio onChange={isSingleHandler} />}
                        label={<span>{t('Dww.step2Single')} </span>} />
                    </RadioGroup>
                  </FormControl>
                </Grid>

              </Grid>

              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {t('Dww.nextBtn')}
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>

              </div>
            </StepContent>
          </Step>
          {/* Все шаги ниже никакого смысла пока не несут, можно не смотреть */}
          <Step hidden={!isCompetition}>
            <StepLabel>
              <Typography variant="caption">{t('Dww.competition')}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1">
                {t('Dww.competition')}
              </Typography>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {t('Dww.nextBtn')}
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>

          <Step hidden={!isShow}>
            <StepLabel>
              <Typography variant="caption">{t('Dww.worldShow')}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1">
                {t('Dww.worldShow')}
              </Typography>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {t('Dww.nextBtn')}
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="caption">Summary</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1">
                Summary
              </Typography>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {t('Dww.nextBtn')}
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>

        </Stepper>

      </Paper>
      <LangSwitch />
    </Box>
  );
};
