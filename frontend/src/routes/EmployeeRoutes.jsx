import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import UserHeader from '../components/Home/Navbar';
import EmployeeLogin from '../pages/EmployeeLogin';
import Task from '../pages/TaskDetails';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function EmployeeRoutes() {
  const employee = useSelector((state) => state?.employee?.employees?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!employee?._id) {
      // Redirect to login if employee is not logged in
      navigate('/login');
    }
  }, [employee]);

  return (
    <>
      <UserHeader />
      <Routes>
        <Route
          path="/"
          element={employee ? <Navigate to="/tasks" /> : <Home />}
        />
        <Route
          path="/login"
          element={!employee ? <EmployeeLogin /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/tasks"
          element={employee ? <Task /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default EmployeeRoutes;
