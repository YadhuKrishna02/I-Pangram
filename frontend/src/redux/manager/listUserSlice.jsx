import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import departmentApi from '../../common/apis/departmentApi';

export const asyncListEmployees = createAsyncThunk(
  'manager/asyncListEmployees',
  async () => {
    try {
      const response = await departmentApi.get('/list_all_employees');
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);

const initialState = {
  listEmployees: {},
};

const listEmployeesSlice = createSlice({
  name: 'listEmployees',
  initialState,
  reducers: {
    addlistEmployees: (state, { payload }) => {
      state.listEmployees = { ...state.listEmployees, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncListEmployees.pending, () => {
        console.log('Pending');
      })
      .addCase(asyncListEmployees.fulfilled, (state, { payload }) => {
        console.log('Users Fetched');
        return { ...state, listEmployees: payload };
      })

      .addCase(asyncListEmployees.rejected, () => {
        console.log('Rejected');
      });
  },
});
export default listEmployeesSlice.reducer;
