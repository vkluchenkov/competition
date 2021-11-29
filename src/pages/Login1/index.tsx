/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { styles } from "./styles";

import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../store/User";
import qs from "query-string";
import logo from "../../images/logo.svg"

import { Button, TextField, Typography, Box, Paper, Avatar, FormControlLabel, Switch, Select, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid, MenuItem } from "@material-ui/core";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormInputField } from "../../ui-kit/input";
import { useTranslation, Namespace } from "react-i18next";

interface FormFields {
  email: string,
  password: string
}

export const Login: React.FC = () => {
  const { t, i18n } = useTranslation();

  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormFields>();

  const currentUrl = useLocation();
  const parsedUrl = qs.parse(currentUrl.search);
  const navigate = useNavigate();

  const mustBeString = (value: any): value is string => {
    if (typeof value !== 'string') {
      throw new Error('Thats not a string')
    }
    return true;
  }

  const [{ currentUser }, { checkCredentials }] = useUser();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: any) => {
    event.preventDefault();
    try {
      checkCredentials(email, pass);
      if (mustBeString(parsedUrl.redirect)) {
        navigate(parsedUrl.redirect)
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!currentUser) {
    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 450,
        }}>
        <Paper
          elevation={3}
          sx={{
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}>

          <Typography variant="h3" component="h1" gutterBottom>
            {t('Login.title')}
          </Typography>

          <Avatar sx={{ mb: 2, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
            {t('Login.subtitle')}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputField
                name="email"
                label="Email"
                placeholder="user@example.com"
                control={control}
                rules={{
                  required: t<string>('SignUp.required'),
                }}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputField
                name="password"
                label={t<string>('Login.password')}
                type="password"
                control={control}
                rules={{
                  required: t<string>('Login.required'),
                }}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
              <Link href="#" variant="body1">
                {t('Login.passwordHint')}
              </Link>
            </Grid>
          </Grid>

          <Button
            sx={{
              mt: 3,
              mb: 2,
            }}
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            fullWidth
          >
            {t('Login.submitBtn')}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body1">
                {t('Login.signup')}
              </Link>
            </Grid>
          </Grid>
        </Paper>
        <Grid container justifyContent="center">
          <Grid item>
            <Link
              href="#"
              variant="body1"
              onClick={() => i18n.changeLanguage("en")}>
              En
            </Link>
            <span> | </span>
            <Link
              href="#"
              variant="body1"
              onClick={() => i18n.changeLanguage("ru")}>
              Ru
            </Link>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <div css={styles.login_frame}>
        <div css={styles.login_window}>
          <Link href="/">
            <img
              src={"./images/logo.svg"}
              css={styles.login_logo}
              alt="logo"
            ></img>
          </Link>
          <h1 css={styles.login_title}>Hi {currentUser.username}!</h1>
          <p css={styles.login_subtitle}>Nice to see you again</p>
        </div>
      </div>
    );
  }
};
