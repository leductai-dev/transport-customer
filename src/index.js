import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/auth-context";
// import "./styles.css";

import App from "./App";

// Importing the Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  rootElement
);
