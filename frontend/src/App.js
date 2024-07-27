import "./App.css";
import { Sidebar } from "./components/sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="body">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
