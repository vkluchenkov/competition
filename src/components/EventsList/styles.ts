import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  card: {
    maxWidth: 600,
    mb: 3,
    mt: 1,
  },
  past: {
    "&.past": {
      filter: "grayscale(100%)",
      opacity: 0.7,
    },
  },
});
