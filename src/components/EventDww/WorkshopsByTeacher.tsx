/** @jsxImportSource @emotion/react */
import React from "react";
import { workshopsList } from "./workshopsList";
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
import { FormInputCheckbox } from "../../ui-kit/input";
import { useForm, SubmitHandler } from "react-hook-form";

interface WorkshopsByTeacherProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const sortedWorkshops = workshopsList.sort((a, b) => a.teacher.sortOrder - b.teacher.sortOrder)

const wsByTeacherFilter = (filter: number) => sortedWorkshops.filter(ws => ws.teacher.id === filter)

const teachersId = sortedWorkshops.map(ws => ws.teacher.id)
const uniqueTeachersId = Array.from(new Set(teachersId))

const length = (start: string, end: string) => DateTime.fromISO(end).diff(DateTime.fromISO(start), 'hours')

export const WorkshopsByTeacher: React.FC<WorkshopsByTeacherProps> = ({ onChange }) => {
  const { handleSubmit, control, reset, setError, formState: { errors } } = useForm();

  const workshops = uniqueTeachersId.map((id) => {
    const teacherName = sortedWorkshops.find((ws) => ws.teacher.id === id)?.teacher.name
    const wsList = wsByTeacherFilter(id).map(ws => {
      const wsLength = length(ws.start, ws.end).hours;
      const wsDateTime = DateTime.fromISO(ws.start).toFormat("dd.LL.y | H:mm") + "-" + DateTime.fromISO(ws.end).toFormat("H:mm") + " (" + wsLength + "h)";

      return (
        <FormControlLabel
          sx={styles.checkboxItem}
          control={
            <FormInputCheckbox
              onChange={onChange}
              name={`${wsDateTime}+${ws.teacher}+${ws.topic}`}
              control={control} />
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
      <>
        <Typography variant="h6" css={styles.title}>{teacherName}</Typography>
        {wsList}
      </>
    )
  })

  return (
    <Box>
      <FormControl component="fieldset" variant="standard" sx={{ width: "100%" }}>
        <FormGroup >
          {workshops}
        </FormGroup>
        <FormHelperText>Tip: you need to take at least 3 workshops to take part in competition</FormHelperText>
      </FormControl>
    </Box>
  )
}