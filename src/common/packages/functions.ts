import { Package } from "../../types/packages";

export const startDate = (v: Package) => {
  let start = Math.min(...v.excursionOffers.map((e) => e.startDate));
  start = Math.min(start, ...v.hotelOffers.map((e) => e.startDate));
  start = Math.min(start, ...v.flightOffers.map((e) => e.startDate));

  return start;
};
export const endDate = (v: Package) => {
  let end = Math.max(...v.excursionOffers.map((e) => e.endDate));
  end = Math.max(end, ...v.hotelOffers.map((e) => e.endDate));
  end = Math.max(end, ...v.flightOffers.map((e) => e.endDate));

  return end;
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

  return sum - (x.discount / 100) * sum;
};
