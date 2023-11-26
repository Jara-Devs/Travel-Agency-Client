import { Image } from "./api";
import { Excursion, Flight, Hotel } from "./services";

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
}

export interface FlightOfferType extends Offer {
  flight: Flight;
  flightId: string;
  facilities: FlightFacility[];
}

export interface FlightOfferFormType {
  name: string;
  flightId: string;
  availability: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  facilities: number[];
  imageId: string;
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

export interface HotelOfferType extends Offer {
  hotel: Hotel;
  availability: number;
  facilities: HotelFacility[];
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
  facilities: number[];
}

export enum HotelFacility {
  Wifi = 0,
  Pool = 1,
  Gym = 2,
  RoomService = 3,
  Restaurant = 4,
  Bar = 5,
  Spa = 6,
  Parking = 7,
  ChildCare = 8,
  PetFriendly = 9,
  FacilitiesForDisabledGuests = 10,
  Garden = 11,
  Shops = 12,
  AirConditioning = 13,
  AirportShuttle = 14,
}

export enum ExcursionFacility {
  TourGuides = 0,
  Transportation = 1,
  Equipment = 2,
  Meals = 3,
  Drinks = 4,
  EntranceTickets = 5,
  RecreationalActivities = 6,
  FreeTime = 7,
  Communication = 8,
  EnvironmentalEducation = 9,
  SafetyAndFirstAid = 10,
}

export interface ExcursionOfferFormType {
  name: string;
  excursionId: string;
  availability: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  facilities: number[];
  imageId: string;
}

export interface ExcursionOfferType extends Offer {
  excursion: Excursion;
  excursionId: string;
  image: Image;
  facilities: ExcursionFacility[];
}
