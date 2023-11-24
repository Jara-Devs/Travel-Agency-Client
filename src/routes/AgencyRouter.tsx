import { Navigate, Route, Routes } from "react-router-dom";
import PackagesAgency from "../pages/agency/PackagesAgency";
import TicketAgency from "../pages/agency/TicketAgency";
import UsersAgency from "../pages/agency/UsersAgency";
import PrivateRoutes from "./PrivateRoutes";
import { Roles } from "../types/auth";
import HotelOffers from "../pages/agency/HotelOffersApp";

const AgencyRoute = () => (
  <Routes>
    <Route path="/offer" element={<HotelOffers />}></Route>
    <Route path="/package" element={<PackagesAgency />}></Route>
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
