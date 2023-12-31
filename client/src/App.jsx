
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import MedicalReports from "./pages/MedicalReports";

import PrivateRoutes from "./components/PrivateRoutes";
import UnauthorizedRoutes from "./components/UnauthorizedRoutes";
import Home from "./pages/Home";
import ThemeButton from "./components/ThemeButton";

import MedicalInfo from "./pages/MedicalInfo";

import FamilyDetails from "./pages/FamilyDetails";
import HospitalHistory from "./pages/HospitalHistory";
import { VisualChart } from "./pages/VisualChart";
import { appoloData, kauveryData, mgmData } from "./assets/visualData";
import { Blog } from "./pages/Blog";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* UNAUTHORIZED ROUTES */}
          <Route element={<UnauthorizedRoutes />}>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
          </Route>

          {/* AUTHORIZED ROUTES */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/family-details" element={<FamilyDetails />} />
            <Route path="/hospital-history" element={<HospitalHistory />} />
            <Route path="/visual-chart/:id" element={<VisualChart appoloData={appoloData} kauveryData={kauveryData} mgmData={mgmData}/>} />
            <Route path ="/MedicalInfo" element={<MedicalInfo />}/>
            <Route path ="/blogs" element={<Blog />}/>
            <Route path="/medical-reports" element={<MedicalReports />} />
          </Route>
        </Routes>
        <ThemeButton />
      </Router>
    </>
  );
}

export default App;
