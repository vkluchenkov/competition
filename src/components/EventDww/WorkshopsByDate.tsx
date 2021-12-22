/** @jsxImportSource @emotion/react */
import React from "react";
import { styles } from "./styles";
import {
  Typography,
  FormGroup,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Box,
  SwitchProps,
} from "@mui/material";
import { DateTime } from "luxon";
import { InputCheckbox } from "../../ui-kit/input";
import { useForm, SubmitHandler, useFormContext, useFieldArray } from "react-hook-form";
import { FormFields } from './types';
import { useTranslation } from "react-i18next";

const length = (start: string, end: string) => DateTime.fromISO(end).diff(DateTime.fromISO(start), 'hours');

export const WorkshopsByDate: React.FC = () => {

  const { t } = useTranslation();
  const { handleSubmit, control, reset, setError, formState: { errors }, watch, setValue } = useFormContext<FormFields>();
  const { fields, append } = useFieldArray({
    control,
    name: "workshops",
  });

  const watchWorkshops = watch("workshops");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchWorkshops[index],
    };
  });

  const wsByDayFilter = (filter: string) => controlledFields
    .filter(ws => DateTime.fromISO(ws.start)
      .hasSame(DateTime.fromISO(filter), 'day'));

  const days = controlledFields.map(ws => DateTime.fromISO(ws.start).toISODate());
  const uniqueDays = Array.from(new Set(days));

  const handleChange = (wsId: number, event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const wsIndex = watchWorkshops.findIndex((ws: any) => ws.id === wsId);
    setValue(`workshops.${wsIndex}.selected`, checked);
  }

  const workshops = uniqueDays.map(day => {
    const wsDate = DateTime.fromISO(day).toFormat("dd.LL.y")
    const wsList = wsByDayFilter(day).map(ws => {
      const wsLength = length(ws.start, ws.end).hours;
      const wsDateTime = DateTime.fromISO(ws.start).toFormat("H:mm") + "-" + DateTime.fromISO(ws.end).toFormat("H:mm") + " (" + wsLength + t('Dww.ws.h') + ")";

      return (
        <FormControlLabel
          key={ws.id}
          sx={styles.checkboxItem}
          control={
            <InputCheckbox
              onChange={handleChange.bind(null, ws.id)}
              checked={ws.selected}
            />
          }
          label={
            <>
              <Typography variant="body1">
                <strong>{ws.teacher.name}</strong>
              </Typography>
              <Typography variant="body1">
                {ws.topic}: €{ws.price}
              </Typography>
              <Typography variant="body2">
                {wsDateTime}
              </Typography>
            </>
          } />
      )
    });

    return (
      <React.Fragment key={wsDate}>
        <Typography variant="h6" css={styles.title}>{wsDate}</Typography>
        {wsList}
      </React.Fragment>)
  })

  return (
    <Box>
      <FormControl component="fieldset" variant="standard" sx={{ width: "100%" }}>
        <FormGroup >
          {workshops}
        </FormGroup>
        <FormHelperText>{t('Dww.ws.tip')}</FormHelperText>
      </FormControl>
    </Box>
  )
}