import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cakes: 10,
    
    recs : [
        {Table: "User", Field: "First Name", Type: "String" },
        {Table: "User", Field: "Last Name", Type: "String" },
        {Table: "User", Field: "Phone", Type: "String" },
        {Table: "User", Field: "Active", Type: "True/False" },
    ],

    headers : ['Table', 'Field', 'Type']
}

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