import { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropTypes from 'prop-types';

RegisterModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

export default function RegisterModal({ handleClose, open }) {
  const [hobbies, setHobbies] = useState([]);

  const handleAddHobby = (hobby) => {
    setHobbies([...hobbies, hobby]);
  };

  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const buttonStyle = {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      hobby: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: () => {
      // Handle form submission with data
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style}>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AddCircleOutlineOutlinedIcon />
              </Avatar>
              <h2 style={headerStyle}>Signup</h2>
              <Typography variant="caption">
                Please fill this form to create an account
              </Typography>
            </Grid>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                variant="standard"
                fullWidth
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="First Name"
                placeholder="Enter your First Name"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <Typography variant="caption" color="error">
                  {formik.errors.firstName}
                </Typography>
              ) : null}

              <TextField
                variant="standard"
                fullWidth
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Last Name"
                placeholder="Enter your Last Name"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <Typography variant="caption" color="error">
                  {formik.errors.lastName}
                </Typography>
              ) : null}

              <TextField
                variant="standard"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Email"
                placeholder="Enter your Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <Typography variant="caption" color="error">
                  {formik.errors.email}
                </Typography>
              ) : null}

              <TextField
                variant="standard"
                fullWidth
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Password"
                placeholder="Enter a secure password"
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography variant="caption" color="error">
                  {formik.errors.password}
                </Typography>
              ) : null}

              <TextField
                variant="standard"
                type="password"
                fullWidth
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Confirm Password"
                placeholder="Please confirm the password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Typography variant="caption" color="error">
                  {formik.errors.confirmPassword}
                </Typography>
              ) : null}

              <TextField
                variant="standard"
                fullWidth
                name="hobby"
                value={formik.values.hobby}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Hobby"
                placeholder="Enter your Hobby"
              />
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => {
                  handleAddHobby(formik.values.hobby);
                  formik.setFieldValue('hobby', '');
                }}
              >
                Add Hobby
              </Button>
              <div>
                {hobbies.map((hobby, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    color="primary"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={() => {
                      const updatedHobbies = [...hobbies];
                      updatedHobbies.splice(index, 1);
                      setHobbies(updatedHobbies);
                    }}
                  >
                    {hobby}
                  </Button>
                ))}
              </div>

              <Button
                sx={buttonStyle}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.isValid}
              >
                Sign Up
              </Button>

              <Button
                sx={{
                  color: '#ff5c01',
                  marginTop: 2,
                  border: '1px solid #ff5c01',
                }}
                type="submit"
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
              >
                Sign In with Google
              </Button>
            </form>
          </Paper>
        </Grid>
      </Modal>
    </div>
  );
}
