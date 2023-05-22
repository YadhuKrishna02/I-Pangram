// import { configureStore } from '@reduxjs/toolkit';
// import managerReducer from './manager/managerSlice';

// // import userReducer from './employee/employeeSlice';

// export const store = configureStore({
//   reducer: {
//     managers: managerReducer,
//   },
// });
import { configureStore } from '@reduxjs/toolkit';
import managerReducer from './manager/managerSlice';
import departmentReducer from './manager/departmentSlice';
import employeeReducer from './employee/employeeSlice';
import unassignedReducer from './unassignedEmployee/unassigned';
import taskReducer from './manager/taskSlice';
import showTasksReducer from './employee/showTasksSlice';
import listEmployeesReducer from './manager/listUserSlice';
// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Handle potential errors while saving
  }
};

const persistedState = loadState();
export const store = configureStore({
  reducer: {
    manager: managerReducer,
    department: departmentReducer,
    employee: employeeReducer,
    unassignedEmployee: unassignedReducer,
    task: taskReducer,
    showTask: showTasksReducer,
    listEmployee: listEmployeesReducer,
  },
  preloadedState: persistedState,
});
store.subscribe(() => {
  saveState(store.getState());
});
