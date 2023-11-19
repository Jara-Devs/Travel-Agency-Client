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

export interface Hotel {
  id: number;
  name: string;
}

export interface HotelFormType {
  name: string;
}

export interface Flight{
  id: number;
  company: string;
  originId: number;
  destinationId: number;
  origin: TouristPlace;
  destination: TouristPlace;
  duration: number;
  category: number;

}

export interface FlightFormType{
  company: string;
  originId: number;
  destinationId: number;
  category: number;
  duration: number
}