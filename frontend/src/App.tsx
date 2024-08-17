import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import SignUp from "./components/pages/SignUpForm";
import VehicleTable from "./components/pages/VehicleTable";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="/dashboard" element={<VehicleTable />} />
    </Routes>
  );
};

export default App;
