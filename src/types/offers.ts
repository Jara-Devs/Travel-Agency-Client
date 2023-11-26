import { Image } from "./api";
import { Flight } from "./services";

export interface Reaction {
  id: number;
  reactionState: ReactionState;
  touristId: number;
  offerId: number;
}

export enum ReactionState {
  Like = 0,
  Dislike = 1,
}

export interface ReactionForm {
  reactionState: ReactionState;
  touristId: number;
  offerId: number;
}

export interface Offer {
  id: number;
  name: string;
  availability: number;
  agencyId: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  image: Image;
  reactions: Reaction[];
  imageId: number;
}

export interface FlightOfferType extends Offer {
  flight: Flight;
  flightId: number;
  facilities: FlightFacility[];
}

export interface FlightOfferFormType {
  name: string;
  flightId: number;
  availability: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  facilities: number[];
  imageId: number;
}

export enum FlightFacility {
  FreeWifi = 0,
  FreeMeals = 1,
  FreeDrinks = 2,
  FreeEntertainment = 3,
  FreeBaggage = 4,
  FreeSeatSelection = 5,
  FreeAirportTaxi = 6,
  PetTransportation = 7,
}
