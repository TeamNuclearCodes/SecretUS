import React from "react";
import { Sidebar } from "./components/sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const PassVault = () => {
  <div>Pass Vault</div>;
};

const SSHKeys = () => {
  <div>SSH Keys</div>;
};

const PGPKeys = () => {
  <div>PGP Keys</div>;
};

const Settings = () => {
  <div>Settings</div>;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div>
          <Routes>
            <Route exact path="/passvault" component={PassVault} />
            <Route path="/sshkeys" component={SSHKeys} />
            <Route path="/pgpkeys" component={PGPKeys} />
            <Route path="/settings" component={Settings} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
