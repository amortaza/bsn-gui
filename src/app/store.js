import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/list-view/slice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
