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

export const getPackageAvailability = (x: Package) => {
  const minHotel =
    x.hotelOffers.length === 0
      ? Number.MAX_SAFE_INTEGER
      : Math.min(
          ...x.hotelOffers.map((e) => e.availability - e.reserves.length)
        );

  const minFlight =
    x.flightOffers.length === 0
      ? Number.MAX_SAFE_INTEGER
      : Math.min(
          ...x.flightOffers.map((e) => e.availability - e.reserves.length)
        );

  const minExcursion =
    x.excursionOffers.length === 0
      ? Number.MAX_SAFE_INTEGER
      : Math.min(
          ...x.excursionOffers.map((e) => e.availability - e.reserves.length)
        );

  return Math.min(minHotel, minFlight, minExcursion);
};
