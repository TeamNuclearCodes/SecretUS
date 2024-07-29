import "./App.css";
import { Sidebar } from "./components/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/settings/status')
    .then(res => res.json())
    .then(data => {
      if (data && !data.registered) {
        navigate('/register')
      }
    })
    setIsLoading(false)
  },[])

  return (
    <div className="body">
      {isLoading ? (
        <div className="m-auto text-3xl">
          Loading..
        </div>
      ): (
        <>
          <Sidebar />
          <div className="vr"/>
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;
