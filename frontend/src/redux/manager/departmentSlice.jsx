import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import departmentApi from '../../common/apis/departmentApi';

export const addAsyncDepartment = createAsyncThunk(
  'department/addAsyncDepartment',
  async (payload) => {
    try {
      const response = await departmentApi.post('/', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error;
    }
  }
);
export const deleteAsyncDepartment = createAsyncThunk(
  'department/deleteAsyncDepartment',
  async (payload) => {
    try {
      const response = await departmentApi.delete(
        `/delete_department/${payload}`
      );
      return { payload, data: response.data };
    } catch (error) {
      // Handle error
      console.log(error);
      throw error;
    }
  }
);
export const editAsyncDepartment = createAsyncThunk(
  'department/editAsyncDepartment',
  async ({ id, payload }) => {
    try {
      const response = await departmentApi.put(
        `/edit_department/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error;
    }
  }
);
export const fetchAsyncDepartment = createAsyncThunk(
  'department/fetchAsyncDepartment',
  async (payload) => {
    try {
      const response = await departmentApi.get('/view_department', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  departments: [],
};

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    addDepartment: (state, { payload }) => {
      state.departments.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncDepartment.pending, () => {
        console.log('Pending');
      })
      .addCase(addAsyncDepartment.fulfilled, (state, { payload }) => {
        console.log('Department Added');
        state.departments.push(payload);
      })
      .addCase(editAsyncDepartment.pending, () => {
        console.log('edit Pending');
      })
      .addCase(editAsyncDepartment.fulfilled, (state, { payload }) => {
        console.log(payload, 'opopop');
        const departmentIndex = state.departments.findIndex(
          (department) =>
            department.department._id === payload.updatedDepartment._id
        );
        console.log(departmentIndex, 'indddddd');
        if (departmentIndex !== -1) {
          // Update the existing department in the state
          state.departments[departmentIndex].department =
            payload.updatedDepartment;
        }
      })

      .addCase(deleteAsyncDepartment.fulfilled, (state, { payload }) => {
        console.log('Department Deleted');
        state.departments = state.departments.filter(
          (department) => department.department._id !== payload.payload
        );
      })

      .addCase(addAsyncDepartment.rejected, () => {
        console.log('Rejected');
      });
  },
});

export default departmentSlice.reducer;
export const { addDepartment } = departmentSlice.actions;
