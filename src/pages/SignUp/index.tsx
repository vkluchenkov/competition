/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Paper, Avatar, FormControlLabel, Switch, Grid, CircularProgress } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormInputField } from "../../ui-kit/input";
import { User } from "../../models/user"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { signUp } from "../../api";
import { useUser } from "../../store/User";


interface FormFields {
  email: string,
  password: string
}

export const Signup: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleSubmit, control, setError, formState: { errors }, getValues } = useForm<FormFields>();
  const [{ currentUser }, { setActiveUser, setAuthToken }] = useUser();

  const signUpMutation = useMutation<string, any, any, any>(signUp);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signUpMutation.mutateAsync(values);
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setError("email", {
          type: "manual",
          message: "User with this email already exists. Try login instead",
        });
      }
    }
  });

  const [checked, setChecked] = useState(false);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);

  useEffect(() => {
    if (signUpMutation.data) {
      setAuthToken(signUpMutation.data)
      navigate('/')
    }
  }, [signUpMutation.data]);

  if (signUpMutation.isLoading) {
    return (
      <CircularProgress />
    )
  }
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
          {t('SignUp.title')}
        </Typography>

        <Avatar sx={{ mb: 2, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          {t('SignUp.subtitle')}
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
                validate: (value: string) => {
                  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || t<string>('SignUp.incorrectEmail')
                },
              }}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInputField
              name="password"
              label={t<string>('SignUp.password')}
              type="password"
              control={control}
              rules={{
                required: t<string>('Common.required'),
                validate: (value: string) => {
                  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value) || t<string>('SignUp.passwordHint')
                },
              }}
              error={!!errors.password}
              helperText={errors?.password?.message || t<string>('SignUp.passwordHint')}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel control={
              <Switch
                onChange={handleCheck}
              />
            }
              label={<span>{t('SignUp.switchLabel1')}{<Link to="#">{t('SignUp.switchLabel2')}</Link>} *</span>} />
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
          disabled={!checked}
          disableElevation
          fullWidth
        >
          {t('SignUp.submitBtn')}
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/login">
              <Typography variant="body1">
                {t('SignUp.signIn')}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}