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
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";
import { styles } from "./styles"
import { WorkshopsByTeacher } from "./WorkshopsByTeacher"
import { WorkshopsByDate } from "./WorkshopsByDate"

interface WorkshopsFormProps {
  open: boolean;
  onClose: () => void;
};

type WorkshopsType = "fullPass" | "single";

export const WorkshopsForm: React.FC<WorkshopsFormProps> = ({ open, onClose }) => {
  const [singles, setSingles] = useState({});
  const [workshopsType, setWorkshopsType] = useState<WorkshopsType | null>(null);

  const [sort, setSort] = React.useState('teacher');

  const [total, setTotal] = useState(0);


  const handleSingles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingles({
      ...singles,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSorting = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setSort(newAlignment);
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
            {/* Фильтры */}
            <Divider variant="middle" sx={styles.divider} />

            <Box sx={styles.sortBox}>
              <Typography variant="body1" sx={{ mr: 2 }}>Sort by: </Typography>
              <ToggleButtonGroup
                color="primary"
                value={sort}
                exclusive
                onChange={handleSorting}
              >
                <ToggleButton value="teacher" size="small">Teacher</ToggleButton>
                <ToggleButton value="date" size="small">Date</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Синглы по тичерам */}
            <Collapse in={(sort === "teacher")}>
              <Box>
                <FormControl component="fieldset" variant="standard" >
                  <FormGroup >
                    <WorkshopsByTeacher teacher="Marta Korzun" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Alexey Ryaboshapka" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Daliya" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Chronis Taxidis" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Leandro Ferreyra" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Aliah" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Nathalie" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Darya" onChange={handleSingles} />
                    <WorkshopsByTeacher teacher="Polina Ostrovska" onChange={handleSingles} />
                  </FormGroup>
                  <FormHelperText>Tip: you need to take at least 3 workshops to take part in competition</FormHelperText>
                </FormControl>
              </Box>
            </Collapse>

            {/* Синглы по дате */}
            <Collapse in={(sort === "date")}>
              <Box>
                <FormControl component="fieldset" variant="standard" >
                  <FormGroup >
                    <WorkshopsByDate onChange={handleSingles} />
                  </FormGroup>
                  <FormHelperText>Tip: you need to take at least 3 workshops to take part in competition</FormHelperText>
                </FormControl>
              </Box>
            </Collapse>
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