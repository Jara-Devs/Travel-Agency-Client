import { Address } from "./common";

export interface TouristPlace {
  Id: number;
  Name: string;
  Description: string;
  Address: Address;
}

export interface TouristPlaceFormType {
  Name: string;
  Description: string;
  Address: Address;
}

export interface TouristActivity {
  Id: number;
  Name: string;
  Description: string;
}

export interface Excursion {
  Id: number;
  Name: string;
  IsOverNight: boolean;
  Places: TouristPlace[];
  Activities: TouristActivity[];
}

export interface OverNighExcursion extends Excursion {
  HotelId: number;
  Hotel: Hotel;
}

export interface ExcursionFormType {
  Name: string;
  Places: number[];
  Activities: number[];
}

export interface OverNighExcursionFormType extends ExcursionFormType {
  HotelId: number;
}

export interface Hotel {
  Id: number;
  Name: string;
}
