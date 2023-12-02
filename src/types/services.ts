import { Image } from "./api";

export interface City {
  name: string;
  id: string;
  country: string;
  imageId: string;
  image: Image;
}

export interface CityFormType {
  name: string;
  country: string;
}

export interface TouristPlace {
  id: string;
  name: string;
  description: string;
  address: string;
  cityId: string;
  city: City;
  image: Image;
}

export interface TouristPlaceFormType {
  name: string;
  description: string;
  address: string;
  cityId: string;
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
  origin: City;
  destination: City;
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
  type: FacilityType;
}

export interface FacilityFormType {
  name: string;
  type: FacilityType;
}

export enum FacilityType {
  Hotel = 0,
  Excursion = 1,
  Flight = 2,
}
