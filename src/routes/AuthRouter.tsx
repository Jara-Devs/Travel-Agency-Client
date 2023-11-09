import { Route, Routes, Navigate } from "react-router-dom";
import TouristRegister from "../pages/auth/TouristRegister";
import AgencyRegister from "../pages/auth/AgencyRegister";
import Login from "../pages/auth/Login";

export const AuthRouter = () => {
  return (
    <div className="auth-main">
      <Routes>
        <Route path="/register/tourist" element={<TouristRegister />}></Route>
        <Route path="/register/agency" element={<AgencyRegister />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="*"
          element={<Navigate to="/auth/login" replace></Navigate>}
        ></Route>
      </Routes>
    </div>
  );
};
