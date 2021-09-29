import { configureStore } from '@reduxjs/toolkit';
import { ListViewReducer } from '../features/list-view/slice';

export default configureStore({
  reducer: {
    ListView: ListViewReducer
  },
});

