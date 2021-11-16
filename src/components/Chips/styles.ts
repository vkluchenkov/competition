import { createStyles } from "../../types/emotion-styles"

export const styles = createStyles({

  chips_container: {
    display: "flex",
    position: "relative",
    justifyContent: "flex-start",
    gap: "10px",
    width: "calc(100% - 50px)",
    padding: "10px 15px",
    outline: "1px solid #ececec",
    borderRadius: "5px",
    boxSizing: "border-box",
    margin: "25px 25px 0",
    overflowX: "hidden",
    listStyle: "none",
  },
  overlay: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 25px 0 0",
    alignItems: "center",
    fontSize: "18px",
    lineHeight: 1,
    fontWeight: 800,
    width: "80px",
    height: "calc(100% - 20px)",
    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 40%)",
    position: "absolute",
    right: 0,
    cursor: "pointer",
  },
})