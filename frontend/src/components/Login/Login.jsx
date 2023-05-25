import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  addAsyncEmployee,
  loginAsyncEmployee,
} from '../../redux/employee/employeeSlice';

import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  FormControl,
  MenuItem,
  FormHelperText,
  InputLabel,
  Select,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const signpvalidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  gender: yup.string().required('Gender is required'),
  hobbies: yup.array(),
});
const loginvalidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [hobbyInput, setHobbyInput] = useState('');
  const [hobbies, setHobbies] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: '',
      hobbies: [],
    },
    validationSchema: isSignup ? signpvalidationSchema : loginvalidationSchema,
    onSubmit: async (values) => {
      if (isSignup) {
        const response = await dispatch(addAsyncEmployee(values));
        if (response?.payload?.success == true) {
          navigate('/tasks');
        }
      } else {
        const response = await dispatch(loginAsyncEmployee(values));
        if (response?.payload?.success == true) {
          navigate('/tasks');
          toast.success('Login successfully');
        }
      }

      // Handle form submission here
    },
  });

  const handleToggleForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    formik.resetForm();
  };

  const handleHobbyInputChange = (event) => {
    setHobbyInput(event.target.value);
  };

  const handleAddHobby = () => {
    if (hobbyInput.trim() !== '') {
      const updatedHobbies = [...formik.values.hobbies, hobbyInput.trim()];
      formik.setFieldValue('hobbies', updatedHobbies);
      setHobbies(updatedHobbies);
      setHobbyInput('');
    }
  };

  const handleDeleteHobby = (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isSignup ? 'Sign Up' : 'Login'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                  >
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      label="Gender"
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="M">Male</MenuItem>
                      <MenuItem value="F">Female</MenuItem>
                      <MenuItem value="O">Other</MenuItem>
                    </Select>
                    {formik.touched.gender && (
                      <FormHelperText>{formik.errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="hobbyInput"
                    name="hobbies"
                    label="Hobbies"
                    value={hobbyInput}
                    onChange={handleHobbyInputChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddHobby}
                  >
                    Add Hobby
                  </Button>
                  <Grid container spacing={1} sx={{ marginTop: '10px' }}>
                    {hobbies.map((hobby, index) => (
                      <Grid item key={index}>
                        <Chip
                          label={hobby}
                          onDelete={() => handleDeleteHobby(index)}
                          color="primary"
                          variant="outlined"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            {isSignup && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {isSignup ? 'Sign Up' : 'Login'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleToggleForm}
              >
                {isSignup
                  ? 'Already have an account? Login'
                  : 'New user? Register'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
