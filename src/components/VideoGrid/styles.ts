import { createStyles } from "../../types/emotion-styles";

export const styles = createStyles({
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(470px, 1fr))',
    gridColumnGap: '10px',
    gridRowGap: '35px',
    padding: '25px',
  },
})