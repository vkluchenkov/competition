/** @jsxImportSource @emotion/react */
import React from "react";
import { workshopsList } from "./workshopsList";
import { styles } from "./styles";
import {
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";

interface WorkshopsByDateProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const wsByDayFilter = (filter: string) => workshopsList
  .filter(ws => DateTime.fromISO(ws.start)
    .hasSame(DateTime.fromISO(filter), 'day'));

const days = workshopsList.map(ws => DateTime.fromISO(ws.start).toISODate())
const uniqueDays = Array.from(new Set(days))
const length = (start: string, end: string) => DateTime.fromISO(end).diff(DateTime.fromISO(start), 'hours')

export const WorkshopsByDate: React.FC<WorkshopsByDateProps> = ({ onChange }) => {

  const workshops = uniqueDays.map(day => {
    const wsDate = DateTime.fromISO(day).toFormat("dd.LL.y")
    const wsList = wsByDayFilter(day).map(ws => {
      const wsLength = length(ws.start, ws.end).hours;
      const wsDateTime = DateTime.fromISO(ws.start).toFormat("H:mm") + "-" + DateTime.fromISO(ws.end).toFormat("H:mm") + " (" + wsLength + "h)";

      return (
        <FormControlLabel
          sx={styles.checkboxItem}
          control={
            <Checkbox
              // checked
              onChange={onChange}
              name={`${day}+${ws.teacher}+${ws.topic}`}
              sx={styles.largeInput} />
          }
          label={
            <React.Fragment>
              <Typography variant="body1">
                <strong>{ws.teacher.name}</strong>
              </Typography>
              <Typography variant="body1">
                {ws.topic}: €{ws.price}
              </Typography>
              <Typography variant="body2">
                {wsDateTime}
              </Typography>
            </React.Fragment>
          } />
      )
    });

    return (
      <React.Fragment>
        <Typography variant="h6" css={styles.title}>{wsDate}</Typography>
        {wsList}
      </React.Fragment>)
  })

  return (
    <>
      {workshops}
    </>
  )
}