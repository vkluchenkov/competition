import { createStyles } from "../../../types/emotion-styles";

export const styles = createStyles({
  chip: {
    display: "block",
    padding: "10px 15px",
    whiteSpace: "nowrap",
    backgroundColor: "#ececec",
    border: "1px solid grey",
    borderRadius: "20px",
    boxSizing: "border-box",
    fontSize: "14px",
    lineHeight: 1,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all .3s",
    "&:hover": {
      backgroundColor: "#dbdbdb",
    },
    "&.active": {
      backgroundColor: "black",
      color: "white",
      fontWeight: 600,
    },
  },
});
