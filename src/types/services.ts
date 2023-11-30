import { Image } from "./api";
import { Address } from "./common";

export interface TouristPlace {
  id: string;
  name: string;
  description: string;
  address: Address;
  image: Image;
}

export interface TouristPlaceFormType {
  name: string;
  description: string;
  address: Address;
  imageId: string;
}

export interface TouristActivity {
  id: string;
  name: string;
  description: string;
  image: Image;
}

export interface TouristActivityFormType {
  name: string;
  description: string;
  imageId: string;
}

export interface Excursion {
  id: string;
  name: string;
  places: TouristPlace[];
  activities: TouristActivity[];
  image: Image;
  hotels: Hotel[];
}

export interface ExcursionFormType {
  name: string;
  places: string[];
  activities: string[];
  imageId: string;
  hotels: string[];
}

export enum HotelCategory {
  OneStar = 0,
  TwoStars = 1,
  ThreeStars = 2,
  FourStars = 3,
  FiveStars = 4,
}
export interface Hotel {
  id: string;
  name: string;
  category: number;
  touristPlaceId: string;
  touristPlace: TouristPlace;
  image: Image;
}

export interface HotelFormType {
  name: string;
  category: number;
  touristPlaceId: string;
  imageId: string;
}

export interface Flight {
  id: string;
  company: string;
  origin: TouristPlace;
  destination: TouristPlace;
  duration: number;
  originId: string;
  destinationId: string;
}

export interface FlightFormType {
  company: string;
  originId: string;
  destinationId: string;
  duration: number;
}

export interface Facility {
  id: string;
  name: string;
}

export interface FacilityFormType {
  name: string;
}

export enum FacilityType {
  Hotel = 0,
  Excursion = 1,
  Flight = 2,
}
