/** @jsxImportSource @emotion/react */
import { ListItemText, Button, List, ListItem, Box } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { WorkshopsForm } from "./WorkshopsForm";
import { styles } from "./styles";
import { LangSwitch } from "../langSwitch";


interface EventsListProps {
  ageGroup?: string | undefined;
}

export const EventsList: React.FC<EventsListProps> = ({ ageGroup }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: "100%", maxWidth: "600px" }}>
      <List>

        <ListItem divider>
          <ListItemText
            primary={t('Dww.workshops')}
            secondary={t('Dww.eventsList.wsSecondary')}
          />
          <Button variant="outlined" onClick={handleClickOpen} sx={styles.listButton}>
            {t('Dww.eventsList.checkIn')}
          </Button>
        </ListItem>

        <ListItem divider>
          <ListItemText
            primary={t('Dww.competition')}
            secondary={t('Dww.eventsList.competitionSecondary')}
          />
          <Button disabled variant="outlined" sx={styles.listButton}>
            {t('Dww.eventsList.checkIn')}
          </Button>
        </ListItem>

        <ListItem>
          <ListItemText
            primary={t('Dww.worldShow')}
            secondary={t('Dww.eventsList.showSecondary')}
          />
          <Button variant="outlined" sx={styles.listButton}>
            {t('Dww.eventsList.checkIn')}
          </Button>
        </ListItem>

      </List>

      <WorkshopsForm open={open} onClose={handleClose} ageGroup={ageGroup} />
      <LangSwitch />
    </Box>

  )
}