import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from '../pages/AdminHome';
import Department from '../pages/Department';
import AddDepartment from '../pages/AddDepartment';
import AdminHeader from '../components/AdminHome/Navbar';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

function ManagerRoutes() {
  const manager = useSelector((state) => state?.manager.managers.manager);
  console.log(manager);
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      {/* <DrawerComponent /> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <AdminHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route
              path="/"
              element={manager ? <Navigate to="department" /> : <AdminHome />}
            />
          </Routes>

          <Routes>
            <Route
              path="/department"
              element={manager ? <Department /> : <Navigate to="../" />}
            />
          </Routes>
          <Routes>
            <Route
              path="/add_department"
              element={manager ? <AddDepartment /> : '../'}
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default ManagerRoutes;
