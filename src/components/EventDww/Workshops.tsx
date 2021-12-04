/** @jsxImportSource @emotion/react */
import React from "react";
import { workshopsList } from "./workshopsList";
import { styles } from "./styles";
import {
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

interface WorkshopsProps {
  teacher: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const filteredWorkshops = (filter: string) => {
  return workshopsList.filter((ws) => ws.teacher === filter)
}

export const Workshops: React.FC<WorkshopsProps> = ({ teacher, onChange }) => {
  const wsList = filteredWorkshops(teacher).map((ws, index) => {
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
              {ws.topic} ({ws.length}): €{ws.price}
            </Typography>
            <Typography variant="body2">
              {ws.date}
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