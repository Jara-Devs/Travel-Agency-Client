import { Navigate, Route, Routes } from "react-router-dom";
import Hotels from "../pages/home/services/Hotels";
import Excursions from "../pages/home/services/Excursions";
import Flights from "../pages/home/services/Flights";

const ServiceRoute = () => (
  <Routes>
    <Route path="/hotel" element={<Hotels />}></Route>
    <Route path="/excursion" element={<Excursions />}></Route>
    <Route path="/flight" element={<Flights />}></Route>
    <Route path="*" element={<Navigate to="/" />}></Route>
  </Routes>
);

export default ServiceRoute;
