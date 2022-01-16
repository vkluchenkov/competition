/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import { Button, Typography, Box, Paper, Avatar, FormControlLabel, Switch, Grid, CircularProgress } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormInputField } from "../../ui-kit/input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { signUpRequest, signUpValidateCode, signUpCreate } from "../../api";
import { useUser } from "../../store/User";
import { styles } from "./styles"

interface FormFields {
  email: string,
  code: string,
  password: string,
}

export const Signup: React.FC = () => {
  // Hooks
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { handleSubmit, control, setError, formState: { errors } } = useForm<FormFields>();
  const [{ currentUser }, { setAuthToken }] = useUser();

  const requestMutation = useMutation<string, any, any, any>(signUpRequest);
  const validateCodeMutation = useMutation<string, any, any, any>(signUpValidateCode);
  const createMutation = useMutation<string, any, any, any>(signUpCreate);

  // Submit handlers
  const handleCodeRequest = () => handleSubmit(async (values) => {
    try {
      await requestMutation.mutateAsync(values.email)
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setError("email", {
          type: "manual",
          message: t('SignUp.emailExists'),
        });
      }
    }
  });

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
            message: t('SignUp.invalidCode'),
          });
        }
      }
    });

  const handleSetUser = () => handleSubmit(async (values) => await createMutation.mutateAsync(values));

  const [status, setStatus] = useState({
    requestSubmitted: false,
    codeSubmitted: false,
    onSubmit: handleCodeRequest
  });

  const onSubmit = status.onSubmit();

  // States
  const [checked, setChecked] = useState(true);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);

  const submitBtnText = useMemo(() => {
    if (requestMutation.data) {
      return t('SignUp.submitBtnValidate')
    }
    else if (validateCodeMutation.data) {
      return t('SignUp.submitBtn')
    }
    else return t('SignUp.submitBtnNext')
  }, [i18n.language])

  useEffect(() => {
    if (requestMutation.data) {
      setStatus({
        requestSubmitted: true,
        codeSubmitted: false,
        onSubmit: handleCodeCheck
      })
    }
  }, [requestMutation.data]);

  useEffect(() => {
    if (validateCodeMutation.data) {
      setStatus({
        requestSubmitted: true,
        codeSubmitted: true,
        onSubmit: handleSetUser
      })
      setChecked(false);
    }
  }, [validateCodeMutation.data]);

  useEffect(() => {
    if (createMutation.data) {
      setAuthToken(createMutation.data);
      navigate('/');
    }
  }, [createMutation.data]);

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
            {t('SignUp.emailTitle')}
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
            {t('SignUp.checkMail')}
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
            label={t('SignUp.codeFromMail')}
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

    if (createMutation.isLoading) {
      return loader()
    }

    if (status.codeSubmitted) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={styles.hint}>
            {t('SignUp.passwordTitle')}
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

  const checkBox = () => {
    if (status.codeSubmitted) {
      return (
        <Grid item xs={12}>
          <FormControlLabel control={<Switch onChange={handleCheck} />}
            label={<span>{t('SignUp.switchLabel1')}{<Link to="#">{t('SignUp.switchLabel2')}</Link>} *</span>}
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
            {t('SignUp.title')}
          </Typography>

          <Avatar sx={styles.formIcon}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
            {t('SignUp.subtitle')}
          </Typography>

          <Grid container spacing={2}>
            {emailField()}
            {codeField()}
            {passField()}
            {checkBox()}
          </Grid>

          <Button
            sx={styles.formButton}
            type="submit"
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            disabled={!checked}
          >
            {submitBtnText}
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
  } else {
    return <Navigate to="/" />
  }
}