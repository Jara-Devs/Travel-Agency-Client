import { Navigate, Route, Routes } from "react-router-dom";
import UsersApp from "../pages/app/users/UsersApp";
import PlaceApp from "../pages/app/place/PlaceApp";
import ActivityApp from "../pages/app/activity/ActivityApp";
import FlightApp from "../pages/app/flight/FlightApp";
import ExcursionApp from "../pages/app/excursion/ExcursionApp";
import HotelApp from "../pages/app/hotel/HotelApp";
import PrivateRoutes from "./PrivateRoutes";
import { Roles } from "../types/auth";
import FacilityApp from "../pages/app/facility/FacilityApp";
import CityApp from "../pages/app/city/CityApp";

const AppRoute = () => (
  <Routes>
    <Route
      path="/users"
      element={
        <PrivateRoutes component={UsersApp} requiredRoles={[Roles.AdminApp]} />
      }
    ></Route>
    <Route path="/city" element={<CityApp />}></Route>
    <Route path="/facility" element={<FacilityApp />}></Route>
    <Route path="/hotel" element={<HotelApp />}></Route>
    <Route path="/excursion" element={<ExcursionApp />}></Route>
    <Route path="/flight" element={<FlightApp />}></Route>
    <Route path="/activity" element={<ActivityApp />}></Route>
    <Route path="/place" element={<PlaceApp />}></Route>
    <Route path="*" element={<Navigate to="/" />}></Route>
  </Routes>
);

export default AppRoute;
