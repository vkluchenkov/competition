import React from "react"
import { styles } from "./styles"
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";

interface FiltersProps {
  onChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void;
  value: string;
}

export const Filters: React.FC<FiltersProps> = ({ onChange, value }) => {
  return (
    <>
      <Divider variant="fullWidth" sx={styles.divider} />

      <Box sx={styles.sortBox}>
        <Typography variant="body1" sx={{ mr: 2 }}>Sort by: </Typography>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={onChange}
        >
          <ToggleButton value="teacher" size="small">Teacher</ToggleButton>
          <ToggleButton value="date" size="small">Date</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  )
}