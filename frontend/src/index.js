import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Settings from "./pages/Settings";
import PassVault from "./pages/PassVault/PassVault";
import SSHVault from "./pages/SSHKeys";
import PGPVault from "./pages/PGPKeys";
import AddPassword from "./pages/AddPassword.jsx";
import Home from "./pages/Home/Home.jsx";
import CheckLeaks from "./pages/CheckLeaks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "passvault",
        element: <PassVault />,
      },
      {
        path: "pgpkeys",
        element: <PGPVault />,
      },
      {
        path: "sshkeys",
        element: <SSHVault />,
      },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
      {
        path: "add_password",
        element: <AddPassword />,
      },
      {
        path: "leaks",
        element: <CheckLeaks />,
      },
      {
        path: "generate",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
