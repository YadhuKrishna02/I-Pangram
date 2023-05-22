import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

function EmployeeCard() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <StyledPaper elevation={3}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Employee Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Department: HR
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Category: IT
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Location: Kochi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Salary: 50000
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Employee ID: 54545
        </Typography>
      </StyledPaper>
    </Box>
  );
}

export default EmployeeCard;
