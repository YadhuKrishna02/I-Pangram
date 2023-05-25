import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../common/apis/authApi';
export const addAsyncManager = createAsyncThunk(
  'manager/addAsyncManager',
  async (payload) => {
    try {
      const response = await authApi.post('/signup', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);
export const loginAsyncManager = createAsyncThunk(
  'manager/loginAsyncManager',
  async (payload) => {
    try {
      const response = await authApi.post('/login', payload);
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error);
      throw error; // Throw the error to be caught in the .catch() block
    }
  }
);
// export const asyncAssignTask = createAsyncThunk(
//   'manager/asyncAssignTask',
//   async (payload) => {
//     try {
//       const response = await departmentApi.post('/assign_task', payload);
//       return response.data;
//     } catch (error) {
//       // Handle error
//       console.log(error);
//       throw error; // Throw the error to be caught in the .catch() block
//     }
//   }
// );

const initialState = {
  managers: {},
};

const managerSlice = createSlice({
  name: 'managers',
  initialState,
  reducers: {
    addManager: (state, { payload }) => {
      state.managers = { ...state.managers, ...payload };
    },
    removeManager: (state) => {
      state.managers.manager = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncManager.pending, () => {
        console.log('Pending');
      })
      .addCase(addAsyncManager.fulfilled, (state, { payload }) => {
        console.log('Signup Successful');
        return { ...state, managers: payload };
      })
      .addCase(loginAsyncManager.pending, () => {
        console.log('Login Pending');
      })
      .addCase(loginAsyncManager.fulfilled, (state, { payload }) => {
        console.log('Login Successful');
        return { ...state, managers: payload };
      })

      .addCase(loginAsyncManager.rejected, () => {
        console.log('Rejected');
      })
      .addCase(addAsyncManager.rejected, () => {
        console.log('Rejected');
      });
  },
});
export default managerSlice.reducer;
export const { removeManager } = managerSlice.actions;
