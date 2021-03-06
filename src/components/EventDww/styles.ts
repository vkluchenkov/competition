import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  paper: {
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  },
  box: {
    width: "100%",
    maxWidth: 850,
  },
  headerMargin: {
    marginBottom: "15px",
  },
  largeInput: {
    "& .MuiSvgIcon-root": { fontSize: 30 },
  },
  checkboxItem: {
    // marginLeft: "5px",
    marginTop: "10px",
  },
  title: {
    marginTop: "15px",
    textAlign: "center",
  },
  listButton: {
    flexShrink: 0,
    ml: 1,
  },
  bottomBar: {
    padding: "12px 24px",
    backgroundColor: "#eee",
    justifyContent: "space-between",
  },
  total: {
    display: "block",
    justifySelf: "flex-start",
  },
  confirmation: {
    color: "green",
    transition: "all 0.5s",
    opacity: 0,
    "&.confirmationActive": {
      opacity: 1,
    },
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  divider: {
    mt: 2,
    mb: 3,
  },
  sortBox: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
});
