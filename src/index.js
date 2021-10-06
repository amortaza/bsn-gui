import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import { Provider } from "react-redux";

import store from "./app/store";
import App from "./App";

// import { StyledEngineProvider } from '@mui/material/styles'

ReactDOM.render(
  <Provider store={store}>
    {/* <StyledEngineProvider injectFirst> */}
    <App />
    {/* </StyledEngineProvider> */}
  </Provider>
  
  ,document.getElementById("root")
);



