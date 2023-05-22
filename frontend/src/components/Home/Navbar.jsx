import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { removeEmployee } from '../../redux/employee/employeeSlice';

function EmployeeNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employee = useSelector((state) => state?.employee?.employees?.user);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(removeEmployee());
    navigate('/login');
  };

  const handleViewTasks = () => {
    navigate('/tasks');
  };

  const handleLogoutClick = () => {
    if (employee?._id) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          I-Pangram
        </Typography>
        <Button color="inherit" onClick={handleViewTasks}>
          View Tasks
        </Button>
        <Button color="inherit" onClick={handleLogoutClick}>
          {employee?._id ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default EmployeeNavbar;
