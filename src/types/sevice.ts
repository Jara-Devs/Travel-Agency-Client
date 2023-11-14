import { Address } from "./common";

export interface TouristPlace {
  Id: number;
  Name: string;
  Description: string;
  Address: Address;
}

export interface TouristPlaceForm {
  Name: string;
  Description: string;
  Address: Address;
}
