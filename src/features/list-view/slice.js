import { createSlice } from '@reduxjs/toolkit'
import initialState from './state'

const slice = createSlice({
    name: 'listView',

    initialState: initialState,

    reducers: {
      increment: state => {
        state.numOfCakes += 1
      },
    }
})

export const { increment } = slice.actions
export const { listViewReducer } = slice.reducer