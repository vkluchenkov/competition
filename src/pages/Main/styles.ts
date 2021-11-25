import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "calc(100vh - 55px)",
    boxSizing: "border-box",
    padding: "25px",
    overflowY: "scroll",
    width: "calc(100vw - 200px)",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: "1px solid slategrey",
    },
  },
});
