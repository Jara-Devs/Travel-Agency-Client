import { Navigate, Route, Routes } from "react-router-dom";
import PackagesAgency from "../pages/agency/PackagesAgency";
import TicketAgency from "../pages/agency/TicketAgency";
import UsersAgency from "../pages/agency/UsersAgency";
import PrivateRoutes from "./PrivateRoutes";
import { Roles } from "../types/auth";
import HotelOffer from "../pages/agency/offers/HotelOffer";
import FlightOffer from "../pages/agency/offers/FlightOffer";
import ExcursionOffer from "../pages/agency/offers/ExcursionOffer";

const AgencyRoute = () => (
  <Routes>
    <Route
      path="/offer/hotel"
      element={
        <PrivateRoutes
          component={HotelOffer}
          requiredRoles={[Roles.AdminAgency, Roles.ManagerAgency]}
        />
      }
    ></Route>
    <Route
      path="/offer/excursion"
      element={
        <PrivateRoutes
          component={ExcursionOffer}
          requiredRoles={[Roles.AdminAgency, Roles.ManagerAgency]}
        />
      }
    ></Route>
    <Route
      path="/offer/flight"
      element={
        <PrivateRoutes
          component={FlightOffer}
          requiredRoles={[Roles.AdminAgency, Roles.ManagerAgency]}
        />
      }
    ></Route>
    <Route
      path="/package"
      element={
        <PrivateRoutes
          component={PackagesAgency}
          requiredRoles={[Roles.AdminAgency, Roles.ManagerAgency]}
        />
      }
    ></Route>
    <Route path="/ticket" element={<TicketAgency />}></Route>
    <Route
      path="/users"
      element={
        <PrivateRoutes
          component={UsersAgency}
          requiredRoles={[Roles.AdminAgency]}
        />
      }
    ></Route>
    <Route path="*" element={<Navigate to="/" />}></Route>
  </Routes>
);

export default AgencyRoute;
