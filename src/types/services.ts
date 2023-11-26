import { Image } from "./api";
import { Address } from "./common";

export interface TouristPlace {
  id: number;
  name: string;
  description: string;
  address: Address;
  image: Image;
}

export interface TouristPlaceFormType {
  name: string;
  description: string;
  address: Address;
  imageId: number;
}

export interface TouristActivity {
  id: number;
  name: string;
  description: string;
  image: Image;
}

export interface TouristActivityFormType {
  name: string;
  description: string;
  imageId: number;
}

export interface Excursion {
  id: number;
  name: string;
  isOverNight: boolean;
  places: TouristPlace[];
  activities: TouristActivity[];
  image: Image;
}

export interface OverNighExcursion extends Excursion {
  hotelId: number;
  hotel: Hotel;
}

export interface ExcursionFormType {
  name: string;
  places: number[];
  activities: number[];
  imageId: number;
}

export interface OverNighExcursionFormType extends ExcursionFormType {
  hotelId: number;
}

export enum HotelCategory {
  OneStar = 0,
  TwoStars = 1,
  ThreeStars = 2,
  FourStars = 3,
  FiveStars = 4,
}
export interface Hotel {
  id: number;
  name: string;
  category: number;
  touristPlaceId: number;
  touristPlace: TouristPlace;
  image: Image;
}

export interface HotelFormType {
  name: string;
  category: number;
  touristPlaceId: number;
  imageId: number;
}

export interface Flight {
  id: number;
  company: string;
  origin: TouristPlace;
  destination: TouristPlace;
  duration: number;
  flightCategory: number;
  originId: number;
  destinationId: number;
}

export interface FlightFormType {
  company: string;
  originId: number;
  destinationId: number;
  flightCategory: number;
  duration: number;
}

export interface FlightOfferType {
  id: number;
  name: string;
  flight: Flight;
  flightId: number;
  availability: number;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  facilities: number[];
  imageId: number;
  agencyId: number;
  image: Image;
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

export interface HotelOfferType {
  id: number;
  name: string;
  hotel: Hotel;
  description: string;
  price: number;
  startDate: number;
  endDate: number;
  image: Image;
  availability: number;
  agencyId: number;
  facilities: number[];
}

export interface HotelOfferFormType {
  name: string;
  description: string;
  availability: number;
  startDate: number | undefined;
  endDate: number | undefined;
  imageId: number;
  hotelId: number;
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
