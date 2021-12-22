/** @jsxImportSource @emotion/react */
import React from "react";
import { styles } from "./styles";
import {
  FormControl,
  FormControlLabel,
  Box,
  FormGroup,
  FormHelperText,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import { InputCheckbox } from "../../ui-kit/input";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormFields } from './types';
import { useTranslation } from "react-i18next";

interface WorkshopsByTeacherProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const length = (start: string, end: string) => DateTime.fromISO(end).diff(DateTime.fromISO(start), 'hours')

export const WorkshopsByTeacher: React.FC<WorkshopsByTeacherProps> = () => {
  const { t } = useTranslation();

  const { control, watch, setValue } = useFormContext<FormFields>();

  const { fields } = useFieldArray({
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

  const sortedWorkshops = controlledFields.slice().sort((a, b) => a.teacher.sort_order - b.teacher.sort_order)

  const wsByTeacherFilter = (filter: number) => sortedWorkshops.filter(ws => ws.teacher.id === filter)

  const teachersId = sortedWorkshops.map(ws => ws.teacher.id)
  const uniqueTeachersId = Array.from(new Set(teachersId))

  const handleChange = (wsId: number, event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const wsIndex = watchWorkshops.findIndex((ws: any) => ws.id === wsId);
    setValue(`workshops.${wsIndex}.selected`, checked);
  }


  const workshops = uniqueTeachersId.map((id) => {
    const teacherName = sortedWorkshops.find((ws) => ws.teacher.id === id)?.teacher.name
    const wsList = wsByTeacherFilter(id).map(ws => {
      const wsLength = length(ws.start, ws.end).hours;
      const wsDateTime = DateTime.fromISO(ws.start).toFormat("dd.LL.y | H:mm") + "-" + DateTime.fromISO(ws.end).toFormat("H:mm") + " (" + wsLength + t('Dww.ws.h') + ")";

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
      <React.Fragment key={teacherName}>
        <Typography variant="h6" css={styles.title}>{teacherName}</Typography>
        {wsList}
      </React.Fragment>
    )
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