import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  blue_button: {
    height: "40px",
    padding: "10px 15px",
    backgroundColor: "#1a73e8",
    color: "white",
    fontSize: "14px",
    fontWeight: 600,
    border: 0,
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color .3s",
    "&:hover": {
      backgroundColor: "#1557af",
    },
  },
});
