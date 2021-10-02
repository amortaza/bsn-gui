import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cakes: 10,

  value: 3,
  
  recs : [
      {Table2: "User", Field2: "First Name", Type2: "String" },
      {Table2: "User", Field2: "Last Name", Type2: "String" },
      {Table2: "User", Field2: "Phone", Type2: "String" },
      {Table2: "User", Field2: "Active", Type2: "True/False" },
  ],

  headers : ['Table2', 'Field2', 'Type2']
}

export const slice = createSlice({
  name: 'list-view-slice',
  initialState: initialState,
  reducers: {
    andone: (state) => {
      state.value++;
    }
  },
});

export const { andone } = slice.actions

export const ListViewReducer = slice.reducer
export const GetListViewReducer = state => state.ListViewReducer
