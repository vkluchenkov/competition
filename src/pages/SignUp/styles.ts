import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  loaderContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    mt: 1,
    mb: 1,
  },
  hint: {
    mb: 2,
    mt: 2,
    textAlign: "center",
  },
  formBox: {
    width: "100%",
    maxWidth: 450,
  },
  formPaper: {
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 3,
  },
  formIcon: {
    mb: 2,
    bgcolor: "secondary.main",
  },
  formButton: {
    mt: 3,
    mb: 2,
  },
});
