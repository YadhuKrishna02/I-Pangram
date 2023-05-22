import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import departmentApi from '../../common/apis/departmentApi';

export const fetchAsyncUsers = createAsyncThunk(
  'manager/fetchAsyncUsers',
  async () => {
    try {
      const response = await departmentApi.get('/view_users');
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);

const initialState = {
  unassinedEmployees: {},
};

const unassignedSlice = createSlice({
  name: 'unassinedEmployees',
  initialState,
  reducers: {
    fetchUsers: (state, { payload }) => {
      state.unassinedEmployees = { ...state.unassinedEmployees, ...payload };
    },
    // removeManager: (state) => {
    //   state.unassinedEmployees.manager = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncUsers.pending, () => {
        console.log('Pending');
      })

      .addCase(fetchAsyncUsers.fulfilled, (state, { payload }) => {
        console.log(payload.employees, 'qwqwqwqw');
        console.log('Feteched Successfully');
        return { ...state, unassinedEmployees: payload };
      })
      .addCase(fetchAsyncUsers.rejected, () => {
        console.log('Rejected');
      });
  },
});
export default unassignedSlice.reducer;
