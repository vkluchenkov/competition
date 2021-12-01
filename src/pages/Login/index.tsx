/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUser } from "../../store/User";
import qs from "query-string";
import { Button, Typography, Box, Paper, Avatar, CircularProgress } from "@mui/material";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Grid } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputField } from "../../ui-kit/input";
import { useTranslation } from "react-i18next";
import { LangSwitch } from "../../components/langSwitch";
import { useLazyQuery, gql } from "@apollo/client";
import avatar from "../../images/media.webp";

interface FormFields {
  email: string,
  password: string
}

export const Login: React.FC = () => {
  const { t } = useTranslation();

  const { handleSubmit, control, reset, formState: { errors }, setError } = useForm<FormFields>();

  const CHECK_USER = gql`
  query checkUser($password: String, $email: String) {
    users(where: {email: {_eq: $email}, _and: {password: {_eq: $password}}}) {
      email
    }
  }`

  const [checkUser, { loading, error, data }] = useLazyQuery(CHECK_USER);

  const currentUrl = useLocation();
  const parsedUrl = qs.parse(currentUrl.search);
  const navigate = useNavigate();

  const mustBeString = (value: any): value is string => {
    if (typeof value !== 'string') {
      return false;
    }
    return true;
  }

  const [{ currentUser }, { checkCredentials, setActiveUser }] = useUser();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await checkUser({ variables: { email: values.email, password: values.password } });
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error.message,
      });
    }
  });

  useEffect(() => {
    if (data && data.users.length === 0) {
      setError("email", {
        type: "manual",
        message: "Incorrect email or password",
      });
    }

    if (data && data.users.length != 0) {
      setActiveUser({
        id: "001",
        username: "Vasya",
        email: "user@example.com",
        avatar: avatar,
      });
    }
  }, [data]);

  if (loading) {
    return (
      <CircularProgress />
    )
  }

  if (!currentUser) {
    return (
      <Box
        component="form"
        onSubmit={onSubmit}
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
            <LockOpenOutlinedIcon />
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
              <Link to="#">
                <Typography variant="body1">
                  {t('Login.passwordHint')}
                </Typography>
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
              <Link to="/signup">
                <Typography variant="body1">
                  {t('Login.signup')}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
        <LangSwitch />
      </Box>
    );
  } else {
    return (
      <Box
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
            Hi there!
          </Typography>
          <Typography variant="body1">
            Nice to see you again
          </Typography>
        </Paper>

      </Box>
    );
  }
};
