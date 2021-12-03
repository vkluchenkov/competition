/** @jsxImportSource @emotion/react */
import { Button, DialogContentText, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Typography } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogTitle, Radio, Switch } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";

interface WorkshopsFormProps {
  open: boolean;
  onClose: () => void;
}

export const WorkshopsForm: React.FC<WorkshopsFormProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const [isFullPass, setIsFullPass] = useState(false);
  const [single, setSingle] = useState(false);

  // Общая сумма регистрации
  const [total, setTotal] = useState(0);

  const isSingleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  };

  const isFullPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Workshops selection</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can choose between Full Pass and single workshops.
        </DialogContentText>
        <DialogContentText>
          Full Pass includes all festival workshops and gives you discounts for competition and World Show participation. Also allows you to pay in installments (except Promo tariff).
        </DialogContentText>

        <Box component="form">
          <FormControl component="fieldset" fullWidth>
            <RadioGroup row name="workshops-selection" >
              <FormControlLabel
                value="Full Pass"
                control={<Radio />}
                label={<span>{t('Dww.fullPass')} €{basePrices.fullPass}</span>}
              />
              <FormControlLabel
                value="Single Workshops"
                control={<Radio />}
                label={<span>{t('Dww.Step2.singleWS')} </span>} />
            </RadioGroup>
          </FormControl>
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}