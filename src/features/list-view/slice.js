import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cakes: 10,

  value: 3,
  
  recs : [
      {Table: "User", Field: "First Name", Type: "String" },
      {Table: "User", Field: "Last Name", Type: "String" },
      {Table: "User", Field: "Phone", Type: "String" },
      {Table: "User", Field: "Active", Type: "True/False" },
  ],

  headers : ['Table', 'Field', 'Type']
}

export const slice = createSlice({
  name: 'listView',
  initialState: initialState,
  reducers: {
    andone: (state) => {
      state.value++;
    }
  }
});


export const ListViewState = state => state.ListView

export const { andone } = slice.actions

export const ListViewReducer = slice.reducer

