import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// import PageNotFound from './pages/PageNotFound';
import EmployeeRoutes from './routes/EmployeeRoutes';
import ManagerRoutes from './routes/ManagerRoutes';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/manager/*" element={<ManagerRoutes />} />{' '}
          <Route path="/*" element={<EmployeeRoutes />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
