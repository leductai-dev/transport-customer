import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/auth-context";
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './Reducers/Main';


import App from "./App";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducer,composeEnhancer(applyMiddleware()),
);



const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthContextProvider>
    <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </AuthContextProvider>,
  rootElement
);
