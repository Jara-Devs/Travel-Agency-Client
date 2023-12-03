import { Navigate, Route, Routes } from "react-router-dom";
import PackagesAgency from "../pages/agency/packages/PackagesAgency";
import TicketAgency from "../pages/agency/TicketAgency";
import UsersAgency from "../pages/agency/users/UsersAgency";
import PrivateRoutes from "./PrivateRoutes";
import { Roles } from "../types/auth";
import FlightOfferAgency from "../pages/agency/offers/flight/FlightOfferAgency";
import ExcursionOffer from "../pages/agency/offers/excursion/ExcursionOffer";
import HotelOfferAgency from "../pages/agency/offers/hotel/HotelOffer";
import ReservesAgency from "../pages/agency/reserves/ReservesAgency";

const AgencyRoute = () => (
  <Routes>
    <Route path="/reserve" element={<ReservesAgency />}></Route>
    <Route
      path="/offer/hotel"
      element={
        <PrivateRoutes
          component={HotelOfferAgency}
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
          component={FlightOfferAgency}
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
