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
  Typography,
  Collapse,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";
import { styles } from "./styles"
import { WorkshopsByTeacher } from "./WorkshopsByTeacher"
import { WorkshopsByDate } from "./WorkshopsByDate"
import { Filters } from "./WorkshopsFilters";

interface WorkshopsFormProps {
  open: boolean;
  onClose: () => void;
};

type WorkshopsType = "fullPass" | "single";

export const WorkshopsForm: React.FC<WorkshopsFormProps> = ({ open, onClose }) => {
  const [singles, setSingles] = useState({});
  const [workshopsType, setWorkshopsType] = useState<WorkshopsType | null>(null);

  const [sorting, setSorting] = React.useState('teacher');

  const [total, setTotal] = useState(0);


  const handleSingles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingles({
      ...singles,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSorting = (event: React.MouseEvent<HTMLElement>, newSort: string,) => setSorting(newSort);

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

            <Filters value={sorting} onChange={handleSorting} />

            {/* Синглы по тичерам */}
            <Collapse in={(sorting === "teacher")}>
              <WorkshopsByTeacher onChange={handleSingles} />
            </Collapse>

            {/* Синглы по дате */}
            <Collapse in={(sorting === "date")}>
              <WorkshopsByDate onChange={handleSingles} />
            </Collapse>
          </Collapse>

        </Box>
      </DialogContent>

      <DialogActions sx={styles.bottomBar}>
        <Typography variant="body1" sx={styles.total}>Total: €0</Typography>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} variant="outlined">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};