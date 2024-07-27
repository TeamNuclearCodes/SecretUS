import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
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
  );
};
