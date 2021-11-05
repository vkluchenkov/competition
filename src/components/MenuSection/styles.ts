import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  menu_section: {
    width: "100%",
    margin: 0,
    padding: '10px 0',
    "&:not(:last-of-type)": {
      borderBottom: "1px solid lightgrey",
    }
  },

  menu_list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  menu_title: {
    fontSize: "14px",
    color: "grey",
    fontWeight: 700,
    padding: "0 25px",
    marginBottom: "10px",
    textTransform: "uppercase",
  },
})