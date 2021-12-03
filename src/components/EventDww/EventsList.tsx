/** @jsxImportSource @emotion/react */
import { Button, DialogContentText, FormControl, FormControlLabel, List, ListItem } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemText, Radio, RadioGroup } from "@mui/material";
import { Box, maxWidth } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";
import { WorkshopsForm } from "./WorkshopsForm";

export const EventsList: React.FC = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px" }}>
      <List>

        <ListItem>
          <ListItemText
            primary="Workshops"
            secondary="Select single workshops or buy Full Pass and get them all"
          />
          <Button variant="outlined" onClick={handleClickOpen}>
            Fill out
          </Button>
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Competition"
            secondary="3 workshops or Full Pass required to take part in competition"
          />
          <Button disabled variant="outlined">
            Check-in
          </Button>
        </ListItem>

        <ListItem>
          <ListItemText
            primary="World show"
            secondary="Take part in the closing show of the festival"
          />
          <Button variant="outlined">
            Check-in
          </Button>
        </ListItem>

      </List>

      <WorkshopsForm open={open} onClose={handleClose} />

      {/* <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog> */}

    </Box>

  )
}