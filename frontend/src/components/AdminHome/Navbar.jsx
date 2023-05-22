import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginModal from '../Modals/LoginModal';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeManager } from '../../redux/manager/managerSlice';

const pages = ['Department', 'Add-department', 'Employees'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate('/manager');
  };
  const handleLogout = () => {
    dispatch(removeManager());
    navigate('/manager');
  };

  const navigate = useNavigate();
  const manager = useSelector(
    (state) => state?.manager?.managers?.manager?.firstName ?? 'Login'
  );
  console.log(manager);

  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  const handleOpen = (modalType) => {
    if (modalType === 'login') {
      setLoginModalOpen(true);
    }
  };

  const handleClose = () => {
    setLoginModalOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #fff, #333)',
        color: '#19376D',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#19376D',
              textDecoration: 'none',
            }}
          >
            I-Pangram
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  {page === 'Department' ? (
                    <Typography
                      sx={{ textDecoration: 'none' }}
                      textAlign="center"
                      component={Link}
                      to="/manager/department"
                      onClick={() => navigate('/manager/department')}
                    >
                      {page}
                    </Typography>
                  ) : page === 'Add-department' ? (
                    <Typography
                      sx={{ textDecoration: 'none' }}
                      textAlign="center"
                      component={Link}
                      to="/manager/add_department"
                      onClick={() => navigate('/manager/add_department')}
                    >
                      {page}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ textDecoration: 'none' }}
                      textAlign="center"
                      component={Link}
                      to="/manager/view_employees"
                      onClick={() => navigate('/manager/view_employees')}
                    >
                      {page}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Job Zen
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  if (page === 'Add-department') {
                    console.log('clickeddd');
                    navigate('/manager/add_department');
                  } else if (page === 'Employees') {
                    navigate('/manager/view_employees');
                  } else {
                    navigate('/manager/department');
                  }
                }}
                sx={{
                  my: 2,
                  color: '#19376D',
                  display: 'block',
                  md: 'flex',
                  textDecoration: 'none',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Button
              onClick={() => handleOpen('login')}
              sx={{ display: { xs: 'none', md: 'flex', color: '#fff' } }}
              color="inherit"
            >
              {manager ? manager : ''}
            </Button>

            {/* MODAL */}
            <LoginModal handleClose={handleClose} open={loginModalOpen} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  // <Button onClick={manager ? handle   : handleLogin}>
                  //   {manager ? 'Logout' : 'Login'}
                  // </Button>;
                }}
              >
                <Typography textAlign="center">
                  <Button onClick={manager ? handleLogout : handleLogin}>
                    {manager ? 'Logout' : 'Login'}
                  </Button>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
