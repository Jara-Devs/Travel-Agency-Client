import { ExcursionOfferType, FlightOfferType, HotelOfferType } from "./offers";

export interface Package {
  id: string;
  name: string;
  discount: number;
  description: string;
  hotelOffers: HotelOfferType[];
  excursionOffers: ExcursionOfferType[];
  flightOffers: FlightOfferType[];
}

export interface PackageFormType {
  name: string;
  discount: number;
  description: string;
  hotelOffers: string[] | undefined;
  excursionOffers: string[] | undefined;
  flightOffers: string[] | undefined;
}
