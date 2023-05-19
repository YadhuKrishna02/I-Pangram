import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UserHeader from '../components/Home/Navbar';
import LoginModal from '../components/Modals/LoginModal';

function EmployeeRoutes() {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user_login" element={LoginModal} />
      </Routes>
    </>
  );
}

export default EmployeeRoutes;
