/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper, Avatar, FormControlLabel, Switch, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid } from "@material-ui/core";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface FormFields {
  email: string,
  password: string
}

export const Signup: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = data => console.log(data);

  const [checked, setChecked] = useState(false);
  const checkHandle = (event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("");

  const emailHandle = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const passHandle = (event: React.ChangeEvent<HTMLInputElement>) => setPass(event.target.value);

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
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <TextField {...field}
                  required
                  fullWidth
                  id="Email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  placeholder="mary@gmail.com"
                  onChange={emailHandle}
                />}
            />
          </Grid>

          <Grid item sm={12}>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                <TextField
                  required
                  fullWidth
                  id="Password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={pass}
                  onChange={passHandle}
                  helperText="!!!Password requirments!!!"
                />}
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