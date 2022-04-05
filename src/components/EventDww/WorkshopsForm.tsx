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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";
import { styles } from "./styles"
import { WorkshopsByTeacher } from "./WorkshopsByTeacher"
import { WorkshopsByDate } from "./WorkshopsByDate"
import { Filters } from "./WorkshopsFilters";
import { useFormContext } from "react-hook-form";
import { FormFields } from './types';
import { Registration } from "./types";
import { OrderFestival } from "../../pages/Order/types";
import clsx from "clsx";

interface WorkshopsFormProps {
  open: boolean;
  onClose: () => void;
  ageGroup: string | undefined;
  registration: Registration | null;
  orderFestival: OrderFestival | null;
};

type WorkshopsType = "fullPass" | "single";

export const WorkshopsForm: React.FC<WorkshopsFormProps> = ({ open, onClose, ageGroup, registration, orderFestival }) => {
  // Hooks
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext<FormFields>();
  const [singles, setSingles] = useState({});
  const [radioDisabled, setRadioDisabled] = useState(false);
  const [workshopsType, setWorkshopsType] = useState<WorkshopsType | null>(null);
  const [sorting, setSorting] = React.useState('teacher');
  const [confirmationActive, setConfirmationActive] = useState(false);

  // Calculations
  const fullPassPrice = useCallback(() => {
    if (registration?.isFullPass) {
      return 0
    }
    if (ageGroup === "baby" || ageGroup === "kids") {
      return basePrices.fullPass / 2
    }
    return basePrices.fullPass
  }, [ageGroup, registration?.isFullPass])


  // States
  const selectedWs = watch("workshops").filter((ws) => ws.selected)

  // Устанавливаем выбор и/или блокировки на выбор фулл пасса если есть воркшопы в регистрации или ордере
  useEffect(() => {
    if (orderFestival && orderFestival?.isFullPass) {
      setWorkshopsType("fullPass")
      setValue("isFullPass", true, { shouldTouch: false })
      setRadioDisabled(false)
    }
    if (orderFestival && orderFestival?.workshops.length > 0) {
      setWorkshopsType("single")
      setRadioDisabled(false)
    }
    if (registration && registration?.isFullPass) {
      setWorkshopsType("fullPass")
      setValue("isFullPass", true, { shouldTouch: false })
      setRadioDisabled(true)
    }

    if (registration && registration?.workshops.length > 0) {
      setWorkshopsType("single")
      setRadioDisabled(true)
    }
  }, [orderFestival, registration])

  const total = useMemo(() => {
    if (workshopsType === "fullPass") {
      return registration?.isFullPass ? 0 : fullPassPrice()
    } else
      if (!selectedWs) {
        return 0
      }
    return selectedWs.reduce(((prev, current) => prev + current.price), 0)
  }, [selectedWs, workshopsType, fullPassPrice])

  // Handlers
  const handleSingles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingles({
      ...singles,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFullPass = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    if (value === "fullPass") {
      setValue("isFullPass", true, { shouldTouch: true })
    } else {
      setValue("isFullPass", false, { shouldTouch: true })
    }
    setWorkshopsType(value as WorkshopsType)
  }

  const handleSorting = (event: React.MouseEvent<HTMLElement>, newSort: string,) => setSorting(newSort);

  const submitConfirmation = <Typography variant="body1" css={styles.confirmation} className={clsx({ confirmationActive })}>Saved!</Typography>

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('Dww.ws.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('Dww.ws.sub1')}</DialogContentText>
        <DialogContentText>{t('Dww.ws.sub2')}
        </DialogContentText>

        <Box component="form" sx={{ mt: 2 }}>

          {/* Выбор пакет или сингл */}
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="workshops-selection"
              value={workshopsType || ""}
              onChange={(event, value) => handleFullPass(event, value)}
            >
              <FormControlLabel
                value="fullPass"
                control={
                  <Radio sx={styles.largeInput} />
                }
                label={<span>{t('Dww.fullPass')} €{fullPassPrice()}</span>}
                disabled={radioDisabled}
              />
              <FormControlLabel
                value="single"
                control={
                  <Radio sx={styles.largeInput} />
                }
                label={<span>{t('Dww.Step2.singleWS')} </span>}
                disabled={radioDisabled}
              />
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
              <WorkshopsByDate />
            </Collapse>
          </Collapse>

        </Box>
      </DialogContent>

      <DialogActions sx={styles.bottomBar}>
        <Typography variant="body1" css={styles.total}>Total: €{total}</Typography>
        <div css={styles.buttonsContainer}>
          {submitConfirmation}
          <Button onClick={onClose}>{t('Dww.cancelBtn')}</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};