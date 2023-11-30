import { Image } from "./api";
import { Excursion, Facility, Flight, Hotel } from "./services";

export interface Reaction {
  id: string;
  reactionState: ReactionState;
  touristId: string;
  offerId: string;
}

export enum OfferType {
  Hotel = 0,
  Excursion = 1,
  Flight = 2,
}
export enum OffertTypeColor {
  green = 0,
  cyan = 1,
  yellow = 2,
}

export enum ReactionState {
  Like = 0,
  Dislike = 1,
}

export interface ReactionForm {
  reactionState: ReactionState;
  touristId: string;
  offerId: string;
}

export interface Offer {
  id: string;
  name: string;
  availability: number;
  agencyId: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  image: Image;
  reactions: Reaction[];
  imageId: string;
  type: OfferType;
  facilities: Facility[];
}

export interface FlightOfferType extends Offer {
  flight: Flight;
  flightId: string;
}

export interface FlightOfferFormType {
  name: string;
  flightId: string;
  availability: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  facilities: string[];
  imageId: string;
}

export interface HotelOfferType extends Offer {
  hotel: Hotel;
  availability: number;
}

export interface HotelOfferFormType {
  name: string;
  description: string;
  availability: number;
  startDate: number | undefined;
  endDate: number | undefined;
  imageId: string;
  hotelId: string;
  price: number;
  facilities: string[];
}

export interface ExcursionOfferFormType {
  name: string;
  excursionId: string;
  availability: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  facilities: string[];
  imageId: string;
}

export interface ExcursionOfferType extends Offer {
  excursion: Excursion;
  excursionId: string;
  image: Image;
}
