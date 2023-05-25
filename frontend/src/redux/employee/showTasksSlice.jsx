import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import showTaskApi from '../../common/apis/showtaskApi';

export const asyncShowTasks = createAsyncThunk(
  'employees/asyncShowTasks',
  async (payload) => {
    try {
      console.log(payload, 'qqqqqqqq');
      const response = await showTaskApi.get(`/${payload}`);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);

const initialState = {
  showTasks: {},
};

const showTasksSlice = createSlice({
  name: 'showTasks',
  initialState,
  reducers: {
    showTasks: (state, { payload }) => {
      state.showTasks = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncShowTasks.pending, () => {
        console.log('Pending');
      })
      .addCase(asyncShowTasks.fulfilled, (state, { payload }) => {
        console.log('Fetched Successfully');
        return { ...state, showTasks: payload };
      })

      .addCase(asyncShowTasks.rejected, () => {
        console.log('Rejected');
      });
  },
});
export default showTasksSlice.reducer;
