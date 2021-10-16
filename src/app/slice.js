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

    gotoUpdateFormView: (state = initialState, action) => {
      state.focusPage = {
        type: 'updateFormView',
        table: action.payload.table,
        recordId: action.payload.recordId
      }
    },

    gotoNewFormView: (state = initialState, action) => {
      state.focusPage = {
        type: 'newFormView',
        table: action.payload.table
      }
    },

    gotoDictionaryView: (state = initialState, action) => {
      state.focusPage = {
        type: 'dictionaryView'
      }
    },

    gotoDictionaryForm: (state = initialState, action) => {
      state.focusPage = {
        type: 'dictionaryForm',
        table: action.payload.table,
        action: action.payload.action,
      }
    }
  }
});

const { actions } = slice

export const { 
  gotoDictionaryForm, 
  gotoDictionaryView, 
  gotoListView, 
  gotoNewFormView, 
  gotoUpdateFormView } = actions

export const reducer = slice.reducer
export const selector = state => state.AppReducer
