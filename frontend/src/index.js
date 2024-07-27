import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Settings from './pages/Settings';
import PassVault from './pages/PassVault/PassVault';
import SSHVault from './pages/SSHKeys';
import PGPVault from './pages/PGPKeys';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      {
        path: "settings",
        element: <Settings />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);