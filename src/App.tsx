import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigator from "./components/Nav/nav";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navigator />
      <ToastContainer autoClose={3000}/>
      <Outlet />
    </>
  );
}

export default App;
