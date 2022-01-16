import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  modalContainer: {
    position: "absolute",
    top: "300px",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  loaderContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    mt: 1,
    mb: 1,
  },
});
