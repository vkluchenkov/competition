import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  notification: {
    cursor: "pointer",
    position: "fixed",
    bottom: "5px",
    right: "5px",
    zIndex: 1,
    padding: "15px",
    borderRadius: "5px",
    background: "white",
    boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 20%)",
    width: "250px",
    margin: 0,
    fontSize: "14px",
    lineHeight: 1,
    "&.notification_state_opened": {
      cursor: "unset",
      minWidth: "350px",
    },
  },

  notification__title: {
    paddingBottom: "10px",
    fontSize: "14px",
    lineHeight: 1,
  },

  hidden: {
    display: "none",
  },

  notification__content: {
    color: "gray",
    fontSize: "14px",
  },

  queue: {
    padding: "15px 0 0",
    boxSizing: "border-box",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "250px",
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
    "&.queue_hidden": {
      display: "none",
    },
    "&.queue_visible": {
      display: "flex",
    },
  },

  close_button: {
    width: "20px",
    height: "20px",
    backgroundColor: "white",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    fontWeight: 900,
    borderRadius: "50%",
    position: "absolute",
    top: "-10px",
    left: "-10px",
    boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 20%)",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
      cursor: "pointer",
    },
    "&.close_button_state_opened": {
      display: "flex",
    },
    "&.close_button_state_closed": {
      display: "none",
    },
  },
});
