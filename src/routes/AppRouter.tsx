import { Navigate, Route, Routes } from "react-router-dom";
import UsersApp from "../pages/app/UsersApp";
import PlaceApp from "../pages/app/PlaceApp";
import ActivityApp from "../pages/app/ActivityApp";
import FlightApp from "../pages/app/FligthApp";
import ExcursionApp from "../pages/app/ExcursionApp";
import HotelApp from "../pages/app/HotelApp";

const AppRoute = () => (
  <Routes>
    <Route path="/users" element={<UsersApp />}></Route>
    <Route path="/hotel" element={<HotelApp />}></Route>
    <Route path="/excursion" element={<ExcursionApp />}></Route>
    <Route path="/flight" element={<FlightApp />}></Route>
    <Route path="/activity" element={<ActivityApp />}></Route>
    <Route path="/place" element={<PlaceApp />}></Route>
    <Route path="*" element={<Navigate to="/" />}></Route>
  </Routes>
);

export default AppRoute;
