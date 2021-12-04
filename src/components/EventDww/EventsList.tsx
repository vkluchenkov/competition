/** @jsxImportSource @emotion/react */
import { ListItemText, Button, List, ListItem, Box } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { WorkshopsForm } from "./WorkshopsForm";
import { styles } from "./styles";

export const EventsList: React.FC = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px" }}>
      <List>

        <ListItem divider>
          <ListItemText
            primary="Workshops"
            secondary="Select single workshops or buy Full Pass and get them all"
          />
          <Button variant="outlined" onClick={handleClickOpen} sx={styles.listButton}>
            Check-in
          </Button>
        </ListItem>

        <ListItem divider>
          <ListItemText
            primary="Competition"
            secondary="3 workshops or Full Pass required to take part in competition"
          />
          <Button disabled variant="outlined" sx={styles.listButton}>
            Check-in
          </Button>
        </ListItem>

        <ListItem>
          <ListItemText
            primary="World show"
            secondary="Take part in the closing show of the festival"
          />
          <Button variant="outlined" sx={styles.listButton}>
            Check-in
          </Button>
        </ListItem>

      </List>

      <WorkshopsForm open={open} onClose={handleClose} />

    </Box>

  )
}