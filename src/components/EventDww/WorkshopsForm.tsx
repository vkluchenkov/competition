/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  Button,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Box,
  FormGroup,
  FormHelperText,
  Typography,
  Collapse
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";
import { styles } from "./styles"
import { Workshops } from "./Workshops"

interface WorkshopsFormProps {
  open: boolean;
  onClose: () => void;
};

type WorkshopsType = "fullPass" | "single";

export const WorkshopsForm: React.FC<WorkshopsFormProps> = ({ open, onClose }) => {
  const [singles, setSingles] = useState({});
  const [workshopsType, setWorkshopsType] = useState<WorkshopsType | null>(null);
  const [total, setTotal] = useState(0);

  const handleSingles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingles({
      ...singles,
      [event.target.name]: event.target.checked,
    });
  };

  const { t } = useTranslation();

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

        <Box component="form" sx={{ mt: 2 }}>

          {/* Выбор пакет или сингл */}
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="workshops-selection"
              value={workshopsType || ""}
              onChange={(event, value) => setWorkshopsType(value as WorkshopsType)}
            >
              <FormControlLabel
                value="fullPass"
                control={
                  <Radio sx={styles.largeInput} />
                }
                label={<span>{t('Dww.fullPass')} €{basePrices.fullPass}</span>}
              />
              <FormControlLabel
                value="single"
                control={
                  <Radio sx={styles.largeInput} />
                }
                label={<span>{t('Dww.Step2.singleWS')} </span>} />
            </RadioGroup>
          </FormControl>

          {/* Список синглов */}
          <Collapse in={(workshopsType === "single")}>
            <Box>
              <FormControl component="fieldset" variant="standard" >
                <FormGroup >
                  <Workshops teacher="Marta Korzun" onChange={handleSingles} />
                  <Workshops teacher="Alexey Ryaboshapka" onChange={handleSingles} />
                  <Workshops teacher="Daliya" onChange={handleSingles} />
                  <Workshops teacher="Chronis Taxidis" onChange={handleSingles} />
                  <Workshops teacher="Leandro Ferreyra" onChange={handleSingles} />
                  <Workshops teacher="Aliah" onChange={handleSingles} />
                  <Workshops teacher="Nathalie" onChange={handleSingles} />
                  <Workshops teacher="Darya" onChange={handleSingles} />
                  <Workshops teacher="Polina Ostrovska" onChange={handleSingles} />
                </FormGroup>
                <FormHelperText>Tip: you need to take at least 3 workshops to take part in competition</FormHelperText>
              </FormControl>
            </Box>
          </Collapse>

        </Box>
      </DialogContent>

      <DialogActions sx={styles.bottomBar}>
        <Typography variant="body1" sx={styles.total}>Total: €0</Typography>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};