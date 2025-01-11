import "./style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

document.addEventListener("contextmenu", (event) => event.preventDefault());

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);