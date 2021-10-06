import { configureStore } from '@reduxjs/toolkit';

// import { ListViewReducer } from '../features/list-view/slice';
import { reducer as AppReducer } from './slice';

export default configureStore({
  reducer: {
    // ListViewReducer,
    AppReducer,
  },
});

