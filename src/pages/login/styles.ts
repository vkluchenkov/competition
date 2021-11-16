import { createStyles } from "../../types/emotion-styles"

export const styles = createStyles({
  login_frame: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  login_window: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: "400px",
    outline: "1px solid darkgrey",
    borderRadius: "10px",
    padding: "15px 30px 30px",
    boxSizing: "border-box",
  },

  login_logo: {
    width: "120px",
    margin: "0 0 10px"
  },

  login_title: {
    fontSize: "24px",
    fontWeight: 400,
    margin: "0 0 7px",
  },

  login_subtitle: {
    fontSize: "16px",
    color: "black",
    fontWeight: 400,
    margin: "0 0 10px",
  },

  login_form: {
    width: "100%",
  },

  login_input: {
    border: 0,
    outline: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    width: "100%",
    height: "40px",
    padding: "0 10px",
    fontSize: "16px",
    color: "black",
    fontWeight: 400,
    margin: "15px 0 0",
    "&:focus": {
      outline: "2px solid #1a73e8",
    },
  },

  login_link: {
    display: "block",
    color: "#1a73e8",
    fontSize: "14px",
    fontWeight: 600,
    margin: "5px 0 0",
    transition: "color .3s",
    "&:hover": {
      color: "#1557af",
    }
  },

  login_buttons: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "35px 0 0"
  },

  login_button: {
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
      backgroundColor: "#1557af"
    }
  },
})