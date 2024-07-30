import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/Logo.svg";
import lock from "../images/Lock.svg";
import ssh from "../images/SSH.svg";
import pgp from "../images/PGP.svg";
import settings from "../images/Settings.svg";

const sideBarItems = [
  {
    path: '/passvault',
    title: 'PASS VAULT',
    icon: lock
  },
  {
    path: '/sshkeys',
    title: 'SSH VAULT',
    icon: ssh
  },
  {
    path: '/pgpkeys',
    title: 'PGP VAULT',
    icon: pgp
  },
  {
    path: '/settings',
    title: 'SETTINGS',
    icon: settings
  }
]

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
          {sideBarItems.map((item) => (
            <li>
              <NavLink to={item.path} className="sidebarkeys gap-20 items-center">
              <img src={item.icon} alt="Example" className="icon" />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
