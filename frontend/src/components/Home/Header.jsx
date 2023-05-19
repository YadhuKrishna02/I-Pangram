import { Box, styled } from '@mui/material';
import headerImage from '../../images/pexels-edmond-dantès-4344860.jpg';
const Header = () => {
  const StyleHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    minHeight: 400,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${headerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: theme.palette.secondary.main,
  }));
  return <StyleHeader></StyleHeader>;
};

export default Header;
