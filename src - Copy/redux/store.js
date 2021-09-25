import { configureStore } from '@reduxjs/toolkit'
import { listViewReducer } from "../features/list-view/slice";

export default configureStore( {
    reducer: {
      listView: listViewReducer
    }
  } )