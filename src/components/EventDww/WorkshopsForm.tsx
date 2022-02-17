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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { basePrices } from "./prices";
import { styles } from "./styles"
import { WorkshopsByTeacher } from "./WorkshopsByTeacher"
import { WorkshopsByDate } from "./WorkshopsByDate"
import { Filters } from "./WorkshopsFilters";
import { useFormContext } from "react-hook-form";
import { FormFields } from './types';
import { useMutation } from "react-query";
import { setOrder } from "../../api";
import { Registration } from "./types";
import { OrderFestival } from "../../pages/Order/types";

interface WorkshopsFormProps {
  open: boolean;
  onClose: () => void;
  ageGroup: string | undefined;
  festivalId: number;
  registration: Registration | null;
  orderFestival: OrderFestival | null;
};

type WorkshopsType = "fullPass" | "single";

export const WorkshopsForm: React.FC<WorkshopsFormProps> = ({ open, onClose, ageGroup, festivalId, registration, orderFestival }) => {
  // Hooks
  const { t } = useTranslation();
  const { watch, handleSubmit } = useFormContext<FormFields>();
  const [singles, setSingles] = useState({});
  const [radioDisabled, setRadioDisabled] = useState(false);
  const [workshopsType, setWorkshopsType] = useState<WorkshopsType | null>(null);
  const [sorting, setSorting] = React.useState('teacher');

  // Calculations
  const fullPassPrice = useCallback(() => {
    if (registration?.isFullPass) {
      return 0
    }
    if (ageGroup === "baby" || ageGroup === "kids") {
      return basePrices.fullPass / 2
    }
    return basePrices.fullPass
  }, [ageGroup])

  const SubmitMutation = useMutation<string, any, any, any>(setOrder);

  // States
  const selected = watch("workshops").filter((ws) => ws.selected);

  // Устанавливаем выбор и/или блокировки на выбор фулл пасса если есть воркшопы в регистрации или ордере
  useEffect(() => {
    if (orderFestival && orderFestival?.isFullPass) {
      setWorkshopsType("fullPass")
      setRadioDisabled(false)
    }
    if (orderFestival && orderFestival?.workshops.length > 0) {
      setWorkshopsType("single")
      setRadioDisabled(false)
    }
    if (registration && registration?.isFullPass) {
      setWorkshopsType("fullPass")
      setRadioDisabled(true)
    }

    if (registration && registration?.workshops.length > 0) {
      setWorkshopsType("single")
      setRadioDisabled(true)
    }
  }, [])

  const total = useMemo(() => {
    if (workshopsType === "fullPass") {
      return registration?.isFullPass ? 0 : fullPassPrice()
    } else
      if (!selected) {
        return 0
      }
    return selected.reduce(((prev, current) => prev + current.price), 0)
  }, [selected, workshopsType, fullPassPrice])

  // Handlers
  const handleSingles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingles({
      ...singles,
      [event.target.name]: event.target.checked,
    });
  };

  const onSubmit = handleSubmit(async () => {
    const isFullPass = !!(workshopsType === "fullPass")

    const workshops = () => {
      if (!isFullPass && selected) {
        return selected.map((ws) => ws.id)
      } else {
        return []
      }
    }

    const contest = registration?.contest ? registration?.contest : []

    const submitPayload = {
      workshops: workshops(),
      contest,
      isFullPass,
      festivalId
    }

    await SubmitMutation.mutateAsync(submitPayload);
    onClose()
  })

  const handleSorting = (event: React.MouseEvent<HTMLElement>, newSort: string,) => setSorting(newSort);

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
              onChange={(event, value) => setWorkshopsType(value as WorkshopsType)}
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
        <Typography variant="body1" sx={styles.total}>Total: €{total}</Typography>
        <Button onClick={onClose}>{t('Dww.cancelBtn')}</Button>
        <Button
          disabled={!total}
          onClick={onSubmit}
          variant="outlined">
          {t('Dww.submitBtn')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};