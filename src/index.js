import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./app/store";

import "./index.css";
import App from "./App";

import { StyledEngineProvider } from '@mui/material/styles'

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
    <App />
    </StyledEngineProvider>
  </Provider>,
  
  document.getElementById("root")
);



