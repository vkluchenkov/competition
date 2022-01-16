/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../store/User";
import { Button, Typography, Box, Paper, Avatar, CircularProgress, Modal } from "@mui/material";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { FormInputField } from "../../ui-kit/input";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { requestPassReset, setNewPassword, validateResetCode } from "../../api";
import { styles } from "./styles"

interface FormFields {
  email: string,
  code: string,
  password: string,
}

export const PasswordReset: React.FC = () => {
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { handleSubmit, control, formState: { errors }, setError, getValues } = useForm<FormFields>();
  const [{ currentUser }, { setActiveUser, setAuthToken }] = useUser();

  const requestMutation = useMutation<string, any, any, any>(requestPassReset);
  const validateCodeMutation = useMutation<string, any, any, any>(validateResetCode);
  const setPassMutation = useMutation<string, any, any, any>(setNewPassword);

  // Submit handlers
  const handleCodeRequest = () => handleSubmit(async (values) => await requestMutation.mutateAsync(values.email));

  const handleCodeCheck = () =>
    handleSubmit(async (values) => {
      try {
        await validateCodeMutation.mutateAsync({
          email: values.email,
          code: values.code
        })
      } catch (error: any) {
        if (error?.response?.status === 400) {
          setError("code", {
            type: "manual",
            message: t('Reset.invalidCode'),
          });
        }
      }
    });

  const handleSetPass = () => handleSubmit(async (values) => await setPassMutation.mutateAsync(values));

  const [status, setStatus] = useState({
    requestSubmitted: false,
    codeSubmitted: false,
    submitButtonText: t('Reset.submitBtnNext'),
    onSubmit: handleCodeRequest
  });

  const onSubmit = status.onSubmit();

  // State
  useEffect(() => {
    if (requestMutation.data) {
      setStatus({
        requestSubmitted: true,
        codeSubmitted: false,
        submitButtonText: t('Reset.submitBtnValidate'),
        onSubmit: handleCodeCheck
      })
    }
  }, [requestMutation.data]);

  useEffect(() => {
    if (validateCodeMutation.data) {
      setStatus({
        requestSubmitted: true,
        codeSubmitted: true,
        submitButtonText: t('Reset.submitBtn'),
        onSubmit: handleSetPass
      })
    }
  }, [validateCodeMutation.data]);

  useEffect(() => {
    if (setPassMutation.data) {
      setAuthToken(setPassMutation.data);
      navigate('/');
    }
  }, [setPassMutation.data]);

  // Render
  const loader = () => {
    return (
      <Box sx={styles.loaderContainer}>
        <CircularProgress />
      </Box>
    )
  }

  const emailField = () => {
    if (requestMutation.isLoading) {
      return loader()
    }

    const hint = () => {
      if (!status.requestSubmitted) {
        return (
          <Typography variant="h5" gutterBottom sx={styles.hint}>
            {t('Reset.emailTitle')}
          </Typography>
        )
      }
      return <></>
    }
    return (
      <Grid item xs={12}>
        {hint()}
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
          disabled={status.requestSubmitted}
        />
      </Grid>
    )
  }

  const codeField = () => {
    if (validateCodeMutation.isLoading) {
      return loader()
    }
    const hint = () => {
      if (status.requestSubmitted && !status.codeSubmitted) {
        return (
          <Typography variant="h5" gutterBottom sx={styles.hint}>
            {t('Reset.checkMail')}
          </Typography>
        )
      }
      return <></>
    }

    if (status.requestSubmitted)
      return (
        <Grid item xs={12}>
          {hint()}
          <FormInputField
            name="code"
            label={t('Reset.codeFromMail')}
            placeholder="123456"
            inputProps={{ minLength: 6, maxLength: 6 }}
            control={control}
            rules={{
              required: t<string>('Common.required'),
              validate: (value: string) => /([0-9]{6,6})/.test(value),
            }}
            error={!!errors.code}
            helperText={errors?.code?.message}
            disabled={status.codeSubmitted}
          />
        </Grid>
      )
    return <></>
  }

  const passField = () => {

    if (setPassMutation.isLoading) {
      return loader()
    }

    if (status.codeSubmitted) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={styles.hint}>
            {t('Reset.passwordTitle')}
          </Typography>
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
      )
    }
    return <></>
  }

  if (!currentUser) {
    return (
      <Box
        component="form"
        onSubmit={onSubmit}
        css={styles.formBox}>
        <Paper elevation={3} sx={styles.formPaper}>

          <Typography variant="h3" component="h1" gutterBottom>
            {t('Reset.title')}
          </Typography>

          <Avatar sx={styles.formIcon}>
            <LockOpenOutlinedIcon />
          </Avatar>

          <Grid container spacing={2}>
            {emailField()}
            {codeField()}
            {passField()}
          </Grid>

          <Button
            sx={styles.formButton}
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            fullWidth
          >
            {status.submitButtonText}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login">
                <Typography variant="body1">
                  {t('Reset.backToLogin')}
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
