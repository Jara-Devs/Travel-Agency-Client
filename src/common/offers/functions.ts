import { Offer, OfferType } from "../../types/offers";

export const offerTypeLabel = (type: OfferType) => {
  switch (type) {
    case OfferType.Flight:
      return "Flight Offer";
    case OfferType.Hotel:
      return "Hotel Offer";
    case OfferType.Excursion:
      return "Excursion Offer";
  }
};

export const offerAvailability = (offer: Offer) =>
  offer.availability -
  offer.reserves.reduce((acc, reserve) => acc + reserve.cant, 0);
