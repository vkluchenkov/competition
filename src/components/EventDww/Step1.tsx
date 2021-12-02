/** @jsxImportSource @emotion/react */
import { FormControlLabel, Grid, Typography } from "@material-ui/core";
import { Switch } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const Step1: React.FC = () => {
  const { t } = useTranslation();

  const [isWorkshops, setIsWorkshops] = useState(false);
  const [isCompetition, setIsCompetition] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const isWorkshopsHandler = (event: React.ChangeEvent<HTMLInputElement>) => setIsWorkshops(event.target.checked);
  const isCompetitionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setIsCompetition(event.target.checked);
  const isShowHandler = (event: React.ChangeEvent<HTMLInputElement>) => setIsShow(event.target.checked)

  return (
    <React.Fragment>

      <Typography variant="h5">
        {t('Dww.Step1.title')}
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

    </React.Fragment>

  )
}