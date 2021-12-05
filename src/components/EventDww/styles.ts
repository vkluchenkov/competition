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
  },
  total: {
    display: "block",
    width: "100%",
    justifySelf: "flex-start",
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
