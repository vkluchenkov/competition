/** @jsxImportSource @emotion/react */
import { ListItemText, Button, List, ListItem, Box } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { WorkshopsForm } from "./WorkshopsForm";
import { styles } from "./styles";
import { ContestForm } from "./ContestForm";

interface DwwEventsProps {
  ageGroup?: string | undefined;
  festivalId: number;
}

export const DwwEvents: React.FC<DwwEventsProps> = ({ ageGroup, festivalId }) => {
  const { t } = useTranslation();

  const [wsOpen, setWsOpen] = useState(false);
  const handleWsOpen = () => setWsOpen(true);
  const handleWsClose = () => setWsOpen(false);

  const [contestOpen, setContestOpen] = useState(false);
  const handleContestOpen = () => setContestOpen(true);
  const handleContestClose = () => setContestOpen(false);

  return (
    <Box sx={{ width: "100%", maxWidth: "600px" }}>
      <List>

        <ListItem divider>
          <ListItemText
            primary={t('Dww.workshops')}
            secondary={t('Dww.eventsList.wsSecondary')}
          />
          <Button variant="outlined" onClick={handleWsOpen} sx={styles.listButton}>
            {t('Dww.eventsList.checkIn')}
          </Button>
        </ListItem>

        <ListItem divider>
          <ListItemText
            primary={t('Dww.competition')}
            secondary={t('Dww.eventsList.competitionSecondary')}
          />
          <Button onClick={handleContestOpen} variant="outlined" sx={styles.listButton}>
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

      <WorkshopsForm
        open={wsOpen}
        onClose={handleWsClose}
        ageGroup={ageGroup}
        festivalId={festivalId}
      />

      <ContestForm
        open={contestOpen}
        onClose={handleContestClose}
        ageGroup={ageGroup}
        festivalId={festivalId}
        isFullPass={false}
      />
    </Box>

  )
}