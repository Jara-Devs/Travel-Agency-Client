import { Navigate, Route, Routes } from "react-router-dom";
import OfferRoute from "./OfferRoute";
import ServiceRoute from "./ServiceRoute";
import Packages from "../pages/home/packages/Packages";
import AppRoute from "./AppRouter";
import AgencyRoute from "./AgencyRouter";
import HomeView from "../pages/HomeView";
import PrivateRoutes from "./PrivateRoutes";
import { Roles } from "../types/auth";

export const WebRouter = () => {
  return (
    <Routes>
      <Route path="/offer/*" element={<OfferRoute />}></Route>
      <Route path="/service/*" element={<ServiceRoute />}></Route>
      <Route path="/package" element={<Packages />}></Route>
      <Route
        path="/app/*"
        element={
          <PrivateRoutes
            requiredRoles={[Roles.AdminApp, Roles.EmployeeApp]}
            component={AppRoute}
          />
        }
      ></Route>
      <Route
        path="/agency/*"
        element={
          <PrivateRoutes
            requiredRoles={[
              Roles.AdminAgency,
              Roles.ManagerAgency,
              Roles.EmployeeAgency,
            ]}
            component={AgencyRoute}
          />
        }
      ></Route>
      <Route path="/" element={<HomeView />}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};
