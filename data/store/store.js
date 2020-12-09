import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks/reducers';

export default configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
