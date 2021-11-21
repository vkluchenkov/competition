import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  section: {
    height: "calc(100vh - 55px)",
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
