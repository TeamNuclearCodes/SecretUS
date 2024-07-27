import "./App.css";
import { Sidebar } from "./components/sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Sidebar />
        <Outlet />
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default App;
