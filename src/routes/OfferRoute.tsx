import { Navigate, Route, Routes } from "react-router-dom";
import ExcursionOffer from "../pages/home/offers/ExcursionOffer";
import HotelOffer from "../pages/home/offers/HotelOffer";
import FlightOffer from "../pages/home/offers/FlightOffer";

const OfferRoute = () => (
  <Routes>
    <Route path="/hotel" element={<HotelOffer />}></Route>
    <Route path="/excursion" element={<ExcursionOffer />}></Route>
    <Route path="/flight" element={<FlightOffer />}></Route>
    <Route path="*" element={<Navigate to="/" />}></Route>
  </Routes>
);

export default OfferRoute;
