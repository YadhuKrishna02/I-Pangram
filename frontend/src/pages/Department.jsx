import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAsyncDepartment } from '../redux/manager/departmentSlice';
import { editAsyncDepartment } from '../redux/manager/departmentSlice';

const Department = () => {
  const departments = useSelector((state) => state?.department?.departments);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);

  const handleEdit = (department) => {
    setEditDepartment(department);
    setOpenModal(true);
  };
  const handleDelete = (dep_id) => {
    dispatch(deleteAsyncDepartment(dep_id));
  };
  const handleShowUsers = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditDepartment(null);
    setOpenModal(false);
  };

  const handleSave = (dep_id, formData) => {
    console.log(formData, typeof formData);
    const payload = new FormData();

    for (let key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const value = formData[key];
        payload.append(key, value);
      }
    }
    console.log(payload, 'payyyyy');
    // const response = dispatch(editAsyncDepartment(dep_id, payload));
    // console.log(response, 'yeaay');
    handleCloseModal();
  };

  return (
    <div style={{ width: '1000px', margin: '20px auto' }}>
      {departments.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <h3>Please add a department.</h3>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            {/* Table header */}
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {/* Table body */}
            <TableBody>
              {departments.map((row) => (
                <TableRow key={row.department.employeeID}>
                  <TableCell>{row.department.employeeID}</TableCell>
                  <TableCell>{row.department.departmentName}</TableCell>
                  <TableCell>{row.department.categoryName}</TableCell>
                  <TableCell>{row.department.location}</TableCell>
                  <TableCell>{row.department.salary}</TableCell>
                  <TableCell>
                    {/* Edit button */}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>
                    {/* Delete button */}
                    <Button
                      onClick={() => handleDelete(row.department._id)}
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      Delete
                    </Button>
                    {/* Show Users button */}
                    <Button
                      variant="outlined"
                      color="info"
                      size="small"
                      onClick={handleShowUsers}
                    >
                      Show Users
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        {/* Modal content */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
          }}
        >
          {/* Edit Department section */}
          {editDepartment ? (
            <>
              {/* Edit Department header */}
              <h2>Edit Department</h2>
              {/* Edit Department form */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Salary</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Edit Department fields */}
                    <TableRow>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={editDepartment.department.employeeID || ''}
                          onChange={(e) =>
                            setEditDepartment({
                              ...editDepartment,
                              department: {
                                ...editDepartment.department,
                                employeeID: e.target.value,
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={editDepartment.department.departmentName || ''}
                          onChange={(e) =>
                            setEditDepartment({
                              ...editDepartment,
                              department: {
                                ...editDepartment.department,
                                departmentName: e.target.value,
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={editDepartment.department.categoryName || ''}
                          onChange={(e) =>
                            setEditDepartment({
                              ...editDepartment,
                              department: {
                                ...editDepartment.department,
                                categoryName: e.target.value,
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={editDepartment.department.location || ''}
                          onChange={(e) =>
                            setEditDepartment({
                              ...editDepartment,
                              department: {
                                ...editDepartment.department,
                                location: e.target.value,
                              },
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={editDepartment.department.salary || ''}
                          onChange={(e) =>
                            setEditDepartment({
                              ...editDepartment,
                              department: {
                                ...editDepartment.department,
                                salary: e.target.value,
                              },
                            })
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Edit Department actions */}
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleSave(
                      editDepartment.department._id,
                      editDepartment.department
                    )
                  }
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Assign User section */}
              <h2>Assign User</h2>
              {/* Assign User table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Assign User rows */}
                    {editDepartment &&
                      editDepartment.users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Department;
