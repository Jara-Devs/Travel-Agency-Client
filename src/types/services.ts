import { Address } from "./common";
import { touristPlace } from '../api/services';

export interface TouristPlace {
  id: number;
  name: string;
  description: string;
  address: Address;
}

export interface TouristPlaceFormType {
  name: string;
  description: string;
  address: Address;
}

export interface TouristActivity {
  id: number;
  name: string;
  description: string;
}

export interface TouristActivityFormType {
  name: string;
  description: string;
}

export interface Excursion {
  id: number;
  name: string;
  isOverNight: boolean;
  places: TouristPlace[];
  activities: TouristActivity[];
}

export interface OverNighExcursion extends Excursion {
  hotelId: number;
  hotel: Hotel;
}

export interface ExcursionFormType {
  name: string;
  places: number[];
  activities: number[];
}

export interface OverNighExcursionFormType extends ExcursionFormType {
  hotelId: number;
}

export interface Hotel {
  id: number;
  name: string;
  category: number;
  touristPlace: TouristPlace;
  touristPlaceID: number
}

export interface HotelFormType {
  name: string;
  category: number;
  touristPlace: TouristPlace;
  touristPlaceID: number

}
