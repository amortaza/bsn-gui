import { configureStore } from '@reduxjs/toolkit';

import { reducer as AppReducer } from './slice';

export default configureStore({
  reducer: {
    AppReducer,
  },
});

