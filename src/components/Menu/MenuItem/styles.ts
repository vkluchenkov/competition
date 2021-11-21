import { createStyles } from "../../../types/emotion-styles";

export const styles = createStyles({
  menu_item: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    color: "black",
    textDecoration: "none",
    padding: "5px 10px",
    transition: "background-color 0.5s",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  },

  menu_icon: {
    width: "25px",
    height: "25px",
    marginRight: "8px",
  },
});
