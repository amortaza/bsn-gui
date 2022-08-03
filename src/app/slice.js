/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schemeRefreshFlag_count: 0,
  isUserAuth: false,
  alert: {
    type: 'info', // info, warning, error, success
    msg: ''
  }
}

export const slice = createSlice({
  name: 'app-slice',

  initialState,

  // payload.type
  // payload.msg
  reducers: {
    flagSchemeUpdate: (state = initialState, action) => {
      state.schemeRefreshFlag_count++;
    },

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
        msg: action.payload.msg,
      }
    },
  }
});

const { actions } = slice

export const {} = actions

export const reducer = slice.reducer
export const selector = state => state.AppReducer

export const appMsg = (type, msg, dispatch) => {
  dispatch(actions.setTypeMsg({type, msg}))
}

export const flagSchemeUpdate = (dispatch) => {
  dispatch( actions.flagSchemeUpdate() )
}
