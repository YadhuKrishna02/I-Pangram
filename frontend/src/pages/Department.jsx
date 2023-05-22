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
import {
  deleteAsyncDepartment,
  editAsyncDepartment,
} from '../redux/manager/departmentSlice';
import { fetchAsyncUsers } from '../redux/unassignedEmployee/unassigned';
import { asyncAssignTask } from '../redux/manager/managerSlice';

const Department = () => {
  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const departments = useSelector((state) => state?.department?.departments);
  const unassignedEmployees = useSelector(
    (state) => state?.unassignedEmployee?.unassinedEmployees?.employees
  );
  const dispatch = useDispatch();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const [openModal, setOpenModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);

  const handleEdit = (department) => {
    setEditDepartment(department);
    setOpenModal(true);
  };

  const handleDelete = (dep_id) => {
    dispatch(deleteAsyncDepartment(dep_id));
  };

  const handleShowUsers = (dep_id) => {
    dispatch(fetchAsyncUsers())
      .then(() => {})
      .catch(() => {});
    setDepartmentId(dep_id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditDepartment(null);
    setOpenModal(false);
  };

  const handleSave = async (dep_id, formData) => {
    const payload = {
      departmentName: formData.departmentName,
      categoryName: formData.categoryName,
      location: formData.location,
      salary: formData.salary,
      employeeID: formData.employeeID,
    };
    dispatch(editAsyncDepartment({ id: dep_id, payload }))
      .then(() => {
        setOpenModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAssignEmployees = (dep_id, userId) => {
    const payload = {
      departmentId: dep_id,
      _id: userId,
    };
    dispatch(asyncAssignTask({ payload }));
  };

  const handleFilter1 = () => {
    setFilter('filter1');
    setCurrentPage(1);
  };

  const handleFilter2 = () => {
    setFilter('filter2');
    setCurrentPage(1);
  };

  let filteredDepartments = departments;
  if (filter === 'filter1') {
    filteredDepartments = departments.filter((department) => {
      return (
        department.department.categoryName === 'IT' &&
        department.department.location.startsWith('A')
      );
    });
  } else if (filter === 'filter2') {
    filteredDepartments = departments
      .filter((department) => department.department.categoryName === 'Sales')
      .sort((a, b) =>
        b.department.employeeID.localeCompare(a.department.employeeID)
      );
  }

  const currentData = filteredDepartments.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: '20px',
          marginRight: '20px',
          padding: '10px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ gap: 2 }}
          onClick={handleFilter1}
        >
          Department Filter
        </Button>
        <Button variant="contained" color="primary" onClick={handleFilter2}>
          Sales Filter
        </Button>
      </div>
      <div style={{ width: '1000px', margin: '20px auto' }}>
        {filteredDepartments.length === 0 ? (
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
                {currentData.map((row) => (
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
                        onClick={() => handleShowUsers(row.department._id)}
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

        {/* Pagination */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Previous page button */}
          <Button
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Prev
          </Button>

          {[...Array(Math.ceil(filteredDepartments.length / rowsPerPage))].map(
            (_, index) => (
              <Button
                key={index + 1}
                disabled={currentPage === index + 1}
                onClick={() => handleChangePage(index + 1)}
              >
                {index + 1}
              </Button>
            )
          )}
          {/* Next page button */}
          <Button
            disabled={
              currentPage ===
              Math.ceil(filteredDepartments.length / rowsPerPage)
            }
            onClick={() => handleChangePage(currentPage + 1)}
          >
            Next
          </Button>
        </div>

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
                            value={
                              editDepartment.department.departmentName || ''
                            }
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
                {unassignedEmployees.length === 0 ? (
                  <div style={{ textAlign: 'center' }}>
                    <h3>All employees have assigned tasks.</h3>
                  </div>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {unassignedEmployees.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() =>
                                  handleAssignEmployees(departmentId, user._id)
                                }
                              >
                                Assign
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {/* Assign User actions */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Department;
