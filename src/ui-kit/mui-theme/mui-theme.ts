import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0277bd",
      // main: "#b378d3",
    },
    secondary: {
      main: "#d81b60",
    },
    // background: {
    //   default: "#1a1a1a",
    //   paper: "#272727",
    // },
    // text: {
    //   primary: "#f1f1f1",
    // },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "Source Sans Pro",
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2.5rem",
    },
    fontSize: 16,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "primary",
      },
    },
  },
});
