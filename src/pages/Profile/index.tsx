import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { useUser } from "../../store/User";
import avatar from "../../images/media.webp";
import { DateTime } from "luxon";

export const Profile: React.FC = () => {

  const [{ currentUser }, { }] = useUser();

  if (currentUser) {
    const birthDay = DateTime.fromISO(currentUser.birthDate).toFormat("dd.LL.y")
    console.log(currentUser)

    return (
      <Box sx={{ width: "100%", maxWidth: "600px", }}>
        <Grid
          container
          direction={"column"}
          spacing={2}
          sx={{ alignItems: "center", width: "100%" }}
        >
          <Grid item>
            <Avatar alt={currentUser.name} src={avatar} sx={{ width: "150px", height: "150px", }} />
          </Grid>
          <Grid item>
            <Typography variant="h3">
              Your profile
              <IconButton>
                <EditIcon />
              </IconButton>
            </Typography>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <List sx={{ width: "100%" }}>
                <ListItem divider sx={{ paddingBottom: "14px" }}>
                  <ListItemText primary={currentUser?.name} secondary={"Public name"} />
                </ListItem>
                <ListItem divider sx={{ paddingBottom: "14px", paddingTop: "14px" }}>
                  <ListItemText primary={currentUser.email} secondary={"Email"} />
                </ListItem>
                <ListItem sx={{ paddingBottom: "14px", paddingTop: "14px" }}>
                  <ListItemText primary={birthDay} secondary={"Your birthday"} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box >
    )
  }
  return <></>

}