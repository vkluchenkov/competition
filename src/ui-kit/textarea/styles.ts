import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  textarea: {
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
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif',
  },

  error: {
    fontSize: "14px",
    color: "red",
    fontWeight: 400,
    margin: "5px 0 0",
    display: "none",
    "&.visible": {
      display: "block",
    },
  },
});
