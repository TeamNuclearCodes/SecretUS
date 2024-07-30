import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo.svg";
import lock from "../images/Lock.svg";
import ssh from "../images/SSH.svg";
import pgp from "../images/PGP.svg";
import settings from "../images/Settings.svg";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarheader">
        <Link to="/">
          <img src={logo} alt="Example" />
        </Link>
      </div>
      <div className="hr"></div>
      <div className="sidebarcontent">
        <ul className="sidebarlist">
          <li>
            <img src={lock} alt="Example" className="icon" />
            <Link to="/passvault" className="sidebarkeys">
              PASS VAULT
            </Link>
          </li>
          <li>
            <img src={ssh} alt="Example" className="icon" />
            <Link to="/sshkeys" className="sidebarkeys">
              SSH VAULT
            </Link>
          </li>
          <li>
            <img src={pgp} alt="Example" className="icon" />
            <Link to="/pgpkeys" className="sidebarkeys">
              PGP VAULT
            </Link>
          </li>
          <li>
            <img src={settings} alt="Example" className="icon" />
            <Link to="settings" className="sidebarkeys">
              SETTINGS
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
