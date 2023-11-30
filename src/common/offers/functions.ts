import { OfferType } from "../../types/offers";

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
