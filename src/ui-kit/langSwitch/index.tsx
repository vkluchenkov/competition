import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


export const LangSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <Grid container justifyContent="center" >
      <Grid item>
        <Link
          to="#"
          onClick={() => i18n.changeLanguage("en")}>
          <Typography variant="body1" component="span">
            En
          </Typography>
        </Link>
        <Typography variant="body1" component="span"> | </Typography>
        <Link
          to="#"
          onClick={() => i18n.changeLanguage("ru")}>
          <Typography variant="body1" component="span">
            Ru
          </Typography>
        </Link>
      </Grid>
    </Grid >
  )
}