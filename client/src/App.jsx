import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import ThemeButton from "./components/ThemeButton";
import MedicalInfo from "./pages/MedicalInfo";
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path ="/MedicalInfo" element={<MedicalInfo />}></Route>

          {/* AUTHORIZED ROUTES */}
          <Route element={<PrivateRoutes/>}>
            {/* <Navbar/> */}
            <Route path="/" element={<Home/>}/>
          </Route>
        </Routes>
        <ThemeButton/>
      </Router>
    </>
  );
}

export default App;
