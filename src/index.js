import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { applyMiddleware, createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import App from "./App";
import rootReducer from "./store";
import { store } from "./store";

// var store = configureStore({reducer:rootReducer}, applyMiddleware(thunk));


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
