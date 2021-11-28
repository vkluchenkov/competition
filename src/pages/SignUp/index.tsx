/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper, Avatar, FormControlLabel, Switch, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid } from "@material-ui/core";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormInputField } from "../../ui-kit/input"

interface FormFields {
  email: string,
  password: string
}

export const Signup: React.FC = () => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = data => console.log(data);

  const [checked, setChecked] = useState(false);
  const checkHandle = (event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);
  console.log(errors)

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
        }}>

        <Typography variant="h3" component="h1" gutterBottom>
          Welcome!
        </Typography>

        <Avatar sx={{ mb: 2, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          Let's create your profile
        </Typography>

        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FormInputField
              name="email"
              label="Email"
              placeholder="user@example.com"
              control={control}
              rules={{
                required: "Please fill out this field",
                validate: (value: string) => {
                  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || "Incorrect email"
                },
              }}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>

          <Grid item sm={12}>
            <FormInputField
              name="password"
              label="Password"
              type="password"
              control={control}
              rules={{
                required: "Please fill out this field",
                validate: (value: string) => {
                  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value) || "Password must be at least 8 characters long and contain digits, UPPERCASE and lowercase letters"
                },
              }}
              error={!!errors.password}
              helperText={errors?.password?.message || "Password must be at least 8 characters long and contain digits, UPPERCASE and lowercase letters"}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel control={
              <Switch
                onChange={checkHandle}
              />
            }
              label={<span>I accept {<Link href="#">terms and conditions</Link>} *</span>} />
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
          Sign up
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="#" variant="body1">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}