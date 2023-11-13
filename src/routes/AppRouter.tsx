import { Navigate, Route, Routes } from "react-router-dom";
import UsersApp from "../pages/app/UsersApp";

const AppRoute = () => (
  <Routes>
    <Route path="/users" element={<UsersApp />}></Route>
    <Route path="*" element={<Navigate to="/" />}></Route>
  </Routes>
);

export default AppRoute;
