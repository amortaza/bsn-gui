import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusPage: 'no focus'
}

export const slice = createSlice({
  name: 'app-slice',

  initialState,

  reducers: {
    gotoDictionary: (state = initialState, action) => {
      state.focusPage = 'dictionary'
    }
  }
});

const { actions } = slice

export const { gotoDictionary } = actions

export const reducer = slice.reducer
export const selector = state => state.AppReducer
