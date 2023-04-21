import React from "react";
import ReactDOM from "react-dom/client";
import "./style/globalStyle.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
