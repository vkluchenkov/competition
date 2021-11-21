import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  queue_item: {
    display: "flex",
    width: "100%",
    maxWidth: "350px",
    cursor: "pointer",
    transition: "background-color .3s",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },

  queue_image: {
    borderRadius: "5px",
    width: "120px",
    height: "67px",
    objectFit: "cover",
  },

  queue_meta: {
    padding: "5px 15px",
    display: "flex",
    flexDirection: "column",
  },

  queue_title: {
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    paddingBottom: "10px",
    margin: 0,
  },

  queue_channel: {
    fontSize: "16px",
    lineHeight: "18px",
    fontWeight: 600,
    paddingBottom: "10px",
    margin: 0,
  },
});
