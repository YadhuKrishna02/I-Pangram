import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAsyncDepartment } from '../redux/manager/departmentSlice';

const validationSchema = yup.object().shape({
  employeeID: yup.string().required('Employee ID is required'),
  departmentName: yup.string().required('Department is required'),
  categoryName: yup.string().required('Category is required'),
  location: yup.string().required('Location is required'),
  salary: yup.string().required('Salary is required'),
});

const AddDepartment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      employeeID: '',
      departmentName: '',
      categoryName: '',
      location: '',
      salary: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission
      const response = await dispatch(addAsyncDepartment(values));
      if (response?.payload?.status == true) {
        navigate('/manager/department');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '500px',
          margin: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add Department
        </Typography>

        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            id="employeeId"
            name="employeeID"
            label="Employee ID"
            value={formik.values.employeeID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.employeeID && Boolean(formik.errors.employeeID)
            }
            helperText={formik.touched.employeeID && formik.errors.employeeID}
            margin="normal"
          />
          <TextField
            fullWidth
            id="department"
            name="departmentName"
            label="Department"
            value={formik.values.departmentName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.departmentName &&
              Boolean(formik.errors.departmentName)
            }
            helperText={
              formik.touched.departmentName && formik.errors.departmentName
            }
            margin="normal"
          />
          <TextField
            fullWidth
            id="category"
            name="categoryName"
            label="Category"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.categoryName && Boolean(formik.errors.categoryName)
            }
            helperText={
              formik.touched.categoryName && formik.errors.categoryName
            }
            margin="normal"
          />
          <TextField
            fullWidth
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            margin="normal"
          />
          <TextField
            fullWidth
            id="salary"
            name="salary"
            label="Salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddDepartment;
