import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "calc(100vh - 55px)",
    padding: "0 25px 25px",
    boxSizing: "border-box",
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
  container: {
    width: "100%",
    maxWidth: "1950px",
    margin: "0 auto",
  },
  single_video_img: {
    width: "100%",
    margin: "0 0 15px",
  },
  single_video_time: {},
  single_video_title: {
    fontSize: "40px",
    fontWeight: 700,
    lineHeight: 1,
    margin: "0 0 15px 0",
  },
  single_video_channel: {
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: 1,
    margin: "0 0 10px 0",
  },
  single_video_meta: {
    fontSize: "16px",
    lineHeight: 1,
    fontWeight: 400,
    margin: 0,
  },
  single_video_avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: "50%",
    border: "1px solid blue",
    width: "50px",
    height: "50px",
    fontSize: "40px",
  },
  single_video_description: {
    margin: "15px 0 0",
    gap: "20px",
    display: "grid",
    gridTemplateColumns: "50px 1fr 40px",
    width: "100%",
  },
  single_video_text: {
    display: "flex",
    flexDirection: "column",
  },
  single_video_action: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: 0,
    fill: "black",
    color: "white",
    width: "40px",
    height: "40px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    justifySelf: "flex-end",
    transition: "fill .3s",
    "&:hover": {
      fill: "#404241",
    },
    "&.single_video_action_active": {
      fill: "red",
    },
    "&.single_video_action_active:hover": {
      fill: "darkred",
    },
  },
});
