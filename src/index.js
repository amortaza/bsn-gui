import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "./app/store";
import App from "./App";

// import { StyledEngineProvider } from '@mui/material/styles'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  
  ,document.getElementById("root")
);



