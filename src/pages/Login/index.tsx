/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../store/User";
import { Button, Typography, Box, Paper, Avatar, CircularProgress } from "@mui/material";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { FormInputField } from "../../ui-kit/input";
import { useTranslation } from "react-i18next";
import avatar from "../../images/media.webp";
import { useMutation } from "react-query";
import { login } from "../../api";
import { User } from "../../models/user"

interface FormFields {
  email: string,
  password: string
}

export const Login: React.FC = () => {
  const { t } = useTranslation();

  const { handleSubmit, control, formState: { errors }, setError, getValues } = useForm<FormFields>();

  const loginMutation = useMutation<User, any, any, any>(login);

  // const currentUrl = useLocation();
  // const parsedUrl = qs.parse(currentUrl.search);
  // const navigate = useNavigate();

  // const mustBeString = (value: any): value is string => {
  //   if (typeof value !== 'string') {
  //     return false;
  //   }
  //   return true;
  // }

  const [{ currentUser }, { setActiveUser }] = useUser();

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
      setActiveUser({
        // firstName: "Ivan",
        // lastName: "Ivanov",
        email: loginMutation.data.email,
        id: loginMutation.data.id,
        // birthDate: "1990-12-12",
        avatar: avatar,
      });
    }
  }, [loginMutation.data]);

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
      </Box>
    );
  } else {
    return <Navigate to="/" />
  }
};
