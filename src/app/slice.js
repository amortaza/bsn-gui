import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusPage: 'no focus'
}

export const slice = createSlice({
  name: 'main-slice',
  initialState: initialState,
});

export const AppReducer = slice.reducer
export const GetAppReducer = state => state.AppReducer
