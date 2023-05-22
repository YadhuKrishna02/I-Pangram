import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import departmentApi from '../../common/apis/departmentApi';

export const asyncAssignTask = createAsyncThunk(
  'manager/asyncAssignTask',
  async (payload) => {
    try {
      const response = await departmentApi.post('/assign_task', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);

const initialState = {
  tasks: {},
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks: (state, { payload }) => {
      state.tasks = { ...state.tasks, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAssignTask.pending, () => {
        console.log('Pending');
      })
      .addCase(asyncAssignTask.fulfilled, (state, { payload }) => {
        console.log('Task Assigned');
        return { ...state, tasks: payload };
      })

      .addCase(asyncAssignTask.rejected, () => {
        console.log('Rejected');
      });
  },
});
export default taskSlice.reducer;
