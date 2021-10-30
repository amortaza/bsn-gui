import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusPage: { type: 'no focus' },
  history: [],
  alert: {
    type: 'info', // info, warning, error, success
    msg: '',
  }
}

export const slice = createSlice({
  name: 'app-slice',

  initialState,

  // payload.table
  // payload.tableLabel
  reducers: {
    setTypeMsg: (state = initialState, action) => {
      let type = {
        'error': 'error',
        'err': 'error',
        'warning' : 'warning',
        'warn' : 'warning',
        'info' : 'info',
        'success': 'success',
        'ok':'success'
      }[ action.payload.type ]
      
      state.alert = {
        type,
        msg: action.payload.msg
      }
    },

    // payload.table
    // payload.tableLabel
    gotoNewFormView: (state = initialState, action) => {
      state.history.push( state.focusPage )

      state.focusPage = {
        type: 'newFormView',
        table: action.payload.table,
        tableLabel: action.payload.tableLabel,
      }
    },

    gotoDictionaryView: (state = initialState, action) => {
      state.history.push( state.focusPage )

      state.focusPage = {
        type: 'dictionaryView'
      }
    },

    gotoDictionaryForm: (state = initialState, action) => {
      state.history.push( state.focusPage )

      state.focusPage = {
        type: 'dictionaryForm',
        table: action.payload.table,
        action: action.payload.action,
      }
    },

    historyRewind: (state = initialState, action) => {
      state.focusPage = state.history.pop()
    },
  }
});

const { actions } = slice

export const { 
  historyRewind,
  gotoDictionaryForm, 
  gotoDictionaryView, 
  gotoNewFormView } = actions

export const reducer = slice.reducer
export const selector = state => state.AppReducer

export const appMsg = (type, msg, dispatch) => {
  dispatch(actions.setTypeMsg({type, msg}))
}
