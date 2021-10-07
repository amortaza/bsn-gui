import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusPage: { type: 'no focus' }
}

export const slice = createSlice({
  name: 'app-slice',

  initialState,

  reducers: {
    gotoListView: (state = initialState, action) => {
      state.focusPage = {
        type: 'listView',
        table: action.payload.table
      }
    },

    gotoFormView: (state = initialState, action) => {
      state.focusPage = {
        type: 'formView',
        table: action.payload.table,
        recordId: action.payload.recordId
      }
    }
  }
});

const { actions } = slice

export const { gotoListView, gotoFormView } = actions

export const reducer = slice.reducer
export const selector = state => state.AppReducer
