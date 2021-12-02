/** @jsxImportSource @emotion/react */
import { FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Typography } from "@material-ui/core";
import { Radio, Switch } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";

export const Step2: React.FC = () => {
  const { t } = useTranslation();

  const [isFullPass, setIsFullPass] = useState(false);

  // Общая сумма регистрации
  const [total, setTotal] = useState(0);

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

  return (
    <React.Fragment>

      <Typography variant="h5">
        {t('Dww.Step2.title')}
      </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">
          {t('Dww.Step2.choiceTitle')}
        </FormLabel>

        <RadioGroup row name="row-radio-buttons-group">
          <FormControlLabel
            value={basePrices.fullPass}
            control={<Radio onChange={isFullPassHandler} />}
            label={<span>{t('Dww.fullPass')} €{basePrices.fullPass}</span>}
          />
          <FormControlLabel
            value="0"
            control={<Radio onChange={isSingleHandler} />}
            label={<span>{t('Dww.Step2.singleWS')} </span>} />
        </RadioGroup>
      </FormControl>

    </React.Fragment>

  )
}