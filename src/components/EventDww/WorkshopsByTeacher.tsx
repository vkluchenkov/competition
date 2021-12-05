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

interface WorkshopsByTeacherProps {
  teacher: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const filteredWorkshops = (filter: string) => {
  return workshopsList.filter((ws) => ws.teacher.name === filter)
}

const length = (start: string, end: string) => {
  const wsStart = DateTime.fromISO(start);
  const wsEnd = DateTime.fromISO(end);
  const duration = wsEnd.diff(wsStart, "hours")
  return duration;
}

export const WorkshopsByTeacher: React.FC<WorkshopsByTeacherProps> = ({ teacher, onChange }) => {
  const wsList = filteredWorkshops(teacher).map((ws, index) => {
    const wsLength = length(ws.start, ws.end).hours;
    const wsDate = DateTime.fromISO(ws.start).toFormat("dd.LL.y | H:mm")
      + "-"
      + DateTime.fromISO(ws.end).toFormat("H:mm")
      + " (" + wsLength + "h)";

    return (
      <FormControlLabel
        sx={styles.checkboxItem}
        control={
          <Checkbox
            // checked
            onChange={onChange}
            name={`${teacher}${index + 1}`}
            sx={styles.largeInput} />
        }
        label={
          <React.Fragment>
            <Typography variant="body1">
              {ws.topic}: €{ws.price}
            </Typography>
            <Typography variant="body2">
              {wsDate}
            </Typography>
          </React.Fragment>
        } />)
  });

  return (
    <React.Fragment>
      <Typography variant="h6" css={styles.title}>{teacher}</Typography>
      {wsList}
    </React.Fragment>
  )
}