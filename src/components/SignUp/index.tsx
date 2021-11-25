/** @jsxImportSource @emotion/react */
import { ReactDOM, useState } from "react";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@material-ui/pickers";
import { css } from "@mui/styled-engine";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { DateTime } from "luxon";

export const Signup: React.FC = () => {
  const [birthDate, setBirthDate] = useState<DateTime>(DateTime.now());
  return (
    <form
      css={css`
      width: 100%;
      max-width: 1023px;
    `}
    >
      <h1>Welcome!</h1>
      <div
        css={css`
      display: grid;
      grid-template-columns: 1fr;
      gap: 25px;
      width: 100%;
      `}
      >
        <TextField
          required
          id="Email"
          label="Email"
          variant="outlined"
          placeholder="mary@gmail.com"
        />
        {/* Проверяем мыло, если уже есть – говорим что есть такой юзер и отправляем на логин. Иначе показываем остальное */}

        <TextField
          required
          id="Password"
          type="password"
          label="Password"
          variant="outlined"
          helperText="!!!Password requirments!!!"
        />

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
          onChange={(evt) => setBirthDate(evt.target.value)}
        />
      </div>
      <div
        css={css`
      display: grid;
      grid-template-columns: 1fr;
      gap: 25px;
      width: 100%;
      `}
      >
        <h2>Address</h2>
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
        />
      </div>
      <div
        css={css`
      display: grid;
      grid-template-columns: 1fr;
      gap: 25px;
      width: 100%;
      `}
      >
        <h2>Contact info</h2>
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
        />
      </div>
      <div>
        <Button
          variant="contained"
          size="large"
          disableElevation>
          Sign up
        </Button>
      </div>
    </form>
  )
}