/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Button, TextField, Typography, Box, Paper, Avatar, FormControlLabel, Switch, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Grid } from "@material-ui/core";

export const Signup: React.FC = () => {
  // const [birthDate, setBirthDate] = useState<MaterialUiPickersDate>(null);
  // const birthDateISO = birthDate?.toISODate()
  const [checked, setChecked] = useState(false);
  const checkHandle = (event: React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("");

  const emailHandle = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const passHandle = (event: React.ChangeEvent<HTMLInputElement>) => setPass(event.target.value);

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: 600,
      }}>
      <Paper
        variant="outlined"
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="Email"
              label="Email"
              variant="outlined"
              value={email}
              placeholder="mary@gmail.com"
              onChange={emailHandle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
{/* 
            <h2>Pesonal information</h2>
            <TextField
              required
              id="FirstName"
              label="First name"
              variant="outlined"
              placeholder="Mary"
            />
            <TextField
              required
              id="LastName"
              label="Last name"
              variant="outlined"
              placeholder="Doe"
            />
            <TextField
              id="StageName"
              label="Stage name"
              variant="outlined"
              placeholder="Asmahan"
              helperText="Fill this if you have one"
            />
            <DatePicker
              disableFuture
              inputVariant="outlined"
              openTo="year"
              format="dd.MM.yyyy"
              label="Date of birth"
              views={["year", "month", "date"]}
              value={birthDate}
              onChange={setBirthDate}
            /> */}
{/* <h2>Address</h2>
          <TextField
            required
            id="Country"
            label="Country"
            variant="outlined"
            placeholder="Poland"
          />
          <TextField
            required
            id="City"
            label="City"
            variant="outlined"
            placeholder="Warsaw"
          />
          <TextField
            required
            id="Street"
            label="Street address"
            variant="outlined"
            placeholder="Podskarbińska 2"
          />
          <TextField
            id="Zip"
            label="Zip code"
            variant="outlined"
            placeholder="03-833"
          /> */}

{/* <h2>Contact info</h2>
          <TextField
            id="Phone"
            label="Phone"
            variant="outlined"
            placeholder="+48 111 222 333"
            helperText="We will use to contact you in case of emergency"
          />
          <TextField
            id="Social"
            label="Social networks"
            variant="outlined"
            placeholder="for example facebook.com/danceweekendwarsaw"
            helperText="Provide a link to your profile on Facebook or Instagram"
          /> */}