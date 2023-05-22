import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeeAuth from '../../common/apis/employeeAuth';

export const addAsyncEmployee = createAsyncThunk(
  'employees/addAsyncEmployee',
  async (payload) => {
    try {
      const response = await employeeAuth.post('/signup', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);

export const loginAsyncEmployee = createAsyncThunk(
  'employees/loginAsyncEmployee',
  async (payload) => {
    try {
      const response = await employeeAuth.post('/login', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);

const initialState = {
  employees: {},
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployees: (state, { payload }) => {
      state.employees = payload;
    },
    removeEmployee: (state) => {
      state.employees.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncEmployee.pending, () => {
        console.log('Pending');
      })
      .addCase(addAsyncEmployee.fulfilled, (state, { payload }) => {
        console.log('Signup Successfully');
        return { ...state, employees: payload };
      })
      .addCase(loginAsyncEmployee.fulfilled, (state, { payload }) => {
        console.log('Login Successfully');
        return { ...state, employees: payload };
      })
      .addCase(addAsyncEmployee.rejected, () => {
        console.log('Rejected');
      });
  },
});
export default employeeSlice.reducer;
export const { removeEmployee } = employeeSlice.actions;
