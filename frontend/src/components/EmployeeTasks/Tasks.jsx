import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { asyncShowTasks } from '../../redux/employee/showTasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

function EmployeeCard() {
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.employee.employees.user._id);

  useEffect(() => {
    dispatch(asyncShowTasks(user_id)).then((response) => {
      console.log(response, 'ppppppp');
      if (response.payload.success === false) {
        setData(0);
      } else {
        setData(response?.payload?.department);
      }
    });
  }, [dispatch, user_id]);

  console.log(data);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <StyledPaper elevation={3}>
        {data === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No tasks assigned
          </Typography>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Employee Details
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Department: {data?.departmentName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Category: {data?.categoryName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Location: {data?.location}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Salary: {data?.salary}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Employee ID: {data?.employeeID}
            </Typography>
          </>
        )}
      </StyledPaper>
    </Box>
  );
}

export default EmployeeCard;
