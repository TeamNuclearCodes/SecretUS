import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo.svg";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarheader">
        <img src={logo} alt="Example" />
      </div>
      <div className="hr"></div>
      <div className="sidebarcontent">
        <ul className="sidebarlist">
          <li>
            <Link to="/passvault">PASS VAULT</Link>
          </li>
          <li>
            <Link to="/sshkeys">SSH KEYS</Link>
          </li>
          <li>
            <Link to="/pgpkeys">PGP KEYS</Link>
          </li>
          <li>
            <Link to="settings">SETTINGS</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
