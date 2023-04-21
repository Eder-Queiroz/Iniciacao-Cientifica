import "./App.css";
import { Outlet } from "react-router-dom";

import Navigator from "./components/Nav/nav";

function App() {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  );
}

export default App;
