import React from "react"
import { styles } from "./styles"
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface FiltersProps {
  onChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void;
  value: string;
}

export const Filters: React.FC<FiltersProps> = ({ onChange, value }) => {
  const { t } = useTranslation();
  return (
    <>
      <Divider variant="fullWidth" sx={styles.divider} />

      <Box sx={styles.sortBox}>
        <Typography variant="body1" sx={{ mr: 2 }}>{t('Dww.ws.sortBy')}: </Typography>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={onChange}
        >
          <ToggleButton value="teacher" size="small">{t('Dww.ws.Teacher')}</ToggleButton>
          <ToggleButton value="date" size="small">{t('Dww.ws.Date')}</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  )
}