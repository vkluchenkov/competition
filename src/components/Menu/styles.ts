import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  menu: {
    display: "block",
    height: "calc(100vh - 55px)",
    width: "200px",
    backgroundColor: "white",
    overflowY: "scroll",
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
