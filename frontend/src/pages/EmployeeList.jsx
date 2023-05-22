import { asyncListEmployees } from '../redux/manager/listUserSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Button,
} from '@mui/material';

const EmployeeList = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncListEmployees())
      .then((response) => {
        setData(response?.payload?.empDeptDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const handleFilterByCriteria1 = () => {
    const filteredEmployees = data.filter(
      (employee) =>
        employee.departmentId.departmentName === 'IT' &&
        employee.departmentId.location.startsWith('A')
    );
    setFilteredData(filteredEmployees);
  };

  const handleFilterByCriteria2 = () => {
    const filteredEmployees = data
      .filter((employee) => employee.departmentId.departmentName === 'Sales')
      .sort((a, b) =>
        a.firstName.localeCompare(b.firstName, 'en', { sensitivity: 'base' })
      );
    setFilteredData(filteredEmployees);
  };

  console.log(data);

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Department Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData
            ? filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row?.firstName}</TableCell>
                  <TableCell>{row?.lastName}</TableCell>
                  <TableCell>{row?.departmentId?.departmentName}</TableCell>
                  <TableCell>{row?.departmentId?.location}</TableCell>
                  <TableCell>{row?.departmentId?.salary}</TableCell>
                </TableRow>
              ))
            : data &&
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row?.firstName}</TableCell>
                  <TableCell>{row?.lastName}</TableCell>
                  <TableCell>{row?.departmentId?.departmentName}</TableCell>
                  <TableCell>{row?.departmentId?.location}</TableCell>
                  <TableCell>{row?.departmentId?.salary}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <Button
        onClick={handleFilterByCriteria1}
        variant="contained"
        sx={{ margin: '1rem' }}
      >
        IT Filter
      </Button>
      <Button
        onClick={handleFilterByCriteria2}
        variant="contained"
        sx={{ margin: '1rem' }}
      >
        Sales Filter
      </Button>
    </Container>
  );
};

export default EmployeeList;
