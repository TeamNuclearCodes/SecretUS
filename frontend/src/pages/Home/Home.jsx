import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

const Home = () => {
  return <div className="home">
    <button><Link to="/add_password" className="button">Add New</Link></button>
    <button><Link to="/leaks" className="button">Check Leaks</Link></button>
    <button><Link to="/generate" className="button">Generate</Link></button>
  </div>;
};

export default Home;
