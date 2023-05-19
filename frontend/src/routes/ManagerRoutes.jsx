import { Routes, Route } from 'react-router-dom';
import AdminHome from '../pages/AdminHome';

import AdminHeader from '../components/AdminHome/Navbar';
import { Box } from '@mui/material';

function ManagerRoutes() {
  return (
    <Box
      sx={{
        display: 'flex',
        background: 'linear-gradient(to right, #fff, #333)',
      }}
    >
      {/* <DrawerComponent /> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <AdminHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<AdminHome />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default ManagerRoutes;
