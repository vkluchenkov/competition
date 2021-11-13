import { createStyles } from "../../types/emotion-styles"

export const styles = createStyles({

  header: {
    padding: "6px 25px",
    borderBottom: "1px solid lightgrey",
    display: "flex",
    justifyContent: "space-between"
  },

  header_section: {
    display: "flex",
    alignContent: "center",
    margin: 0,
    padding: 0,
  },

  header_button: {
    display: "block",
    width: "40px",
    height: "40px",
    margin: "0 5px 0 0",
    outline: "none",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: "50%",
    transition: "background-color 0.5s",
    "&:hover": {
      backgroundColor: "lightgrey"
    }
  },

  header_logo: {
    width: '110px'
  },

  header_search_input: {
    width: "350px",
    paddingLeft: "15px"
  },

  header_blue_button: {
    display: "flex",
    alignItems: "center",
    height: "38px",
    padding: "0 15px",
    textDecoration: "none",
    backgroundColor: "#1a73e8",
    color: "white",
    fontSize: "14px",
    lineHeight: 1,
    fontWeight: 600,
    border: 0,
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color .3s",
    "&:hover": {
      backgroundColor: "#1557af"
    }
  },
})