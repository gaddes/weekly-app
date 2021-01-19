import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks/reducers';
import userReducer from './user/reducers';

export default configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
  },
});
