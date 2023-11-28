import { Package } from "../../types/packages";
import dayjs from "dayjs";

export const startDate = (v: Package) => {
  let start = Math.min(...v.excursionOffers.map((e) => e.startDate));
  start = Math.min(start, ...v.hotelOffers.map((e) => e.startDate));
  start = Math.min(start, ...v.flightOffers.map((e) => e.startDate));

  return dayjs(start).format("DD/MM/YYYY");
};
export const endDate = (v: Package) => {
  let start = Math.max(...v.excursionOffers.map((e) => e.endDate));
  start = Math.max(start, ...v.hotelOffers.map((e) => e.endDate));
  start = Math.max(start, ...v.flightOffers.map((e) => e.endDate));

  return dayjs(start).format("DD/MM/YYYY");
};

export const getPackagePrice = (x: Package) => {
  var sum: number = 0;
  x.hotelOffers.forEach((offer) => {
    sum += offer.price;
  });
  x.excursionOffers.forEach((offer) => {
    sum += offer.price;
  });

  x.flightOffers.forEach((offer) => {
    sum += offer.price;
  });

  return (sum - (x.discount / 100) * sum).toFixed(2);
};
