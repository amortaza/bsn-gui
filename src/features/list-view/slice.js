import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'counter',
  initialState: {
    value: 3,
  },
  reducers: {}
});

export const selectCount = state => state.counter.value;

export default slice.reducer;