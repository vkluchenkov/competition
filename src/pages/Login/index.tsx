/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { useUser } from "../../store/User";
import { Button, Typography, Box, Paper, Avatar, CircularProgress, Grid, Link } from "@mui/material";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useForm } from "react-hook-form";
import { FormInputField } from "../../ui-kit/input";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { login } from "../../api";

interface FormFields {
  email: string,
  password: string
}

export const Login: React.FC = () => {
  const { t } = useTranslation();

  const { handleSubmit, control, formState: { errors }, setError } = useForm<FormFields>();

  const loginMutation = useMutation<string, any, any, any>(login);

  const [{ currentUser }, { setAuthToken }] = useUser();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await loginMutation.mutateAsync(values);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setError("email", {
          type: "manual",
          message: "Incorrect email or password",
        });
      }
    }
  });

  useEffect(() => {
    if (loginMutation.data) {
      setAuthToken(loginMutation.data)
    }
  }, [loginMutation.data, setAuthToken]);

  if (loginMutation.isLoading) {
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
                  required: t<string>('Common.required'),
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
                  required: t<string>('Common.required'),
                }}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
              <Link component={RouterLink} to="/restore">
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
              <Link component={RouterLink} to="/signup">
                <Typography variant="body1">
                  {t('Login.signup')}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  } else {
    return <Navigate to="/" />
  }
};
