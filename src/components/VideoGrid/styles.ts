import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(470px, 1fr))",
    gridColumnGap: "10px",
    gridRowGap: "35px",
    padding: "25px",
  },
  container: {
    position: "relative",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f8f8",
    opacity: 0,
    zIndex: 1,
    transition: "opacity .3s",
    display: "none",
    "&.overlay": {
      display: "block",
      opacity: 0.5,
    },
  },
});
