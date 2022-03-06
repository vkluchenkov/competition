import { Box, Link, Typography } from "@mui/material"
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";


export const ThankYou: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Thank you! Your order has been sucessfully paid.
      </Typography>

      <Link component={RouterLink} to="/my-festivals">
        <Typography variant="body1" align="center">
          Return to your festivals
        </Typography>
      </Link>
    </Box>
  )
}