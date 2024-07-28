import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return <div>
    <button><Link to="/add_password">Add New</Link></button>
    <button><Link to="/leaks">Check Leaks</Link></button>
    <button><Link to="/generate">Generate</Link></button>
  </div>;
};

export default Home;
