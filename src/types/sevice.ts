import { excursion } from "../api/services";
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

export interface TouristActivity {
  Id: number;
  Name: string;
  Description: string;
}

export interface Excursion {
  Id: number;
  Name: string;
  Places: TouristPlace[];
  Activities: TouristActivity[];
}

export const isOverNightExcursion = (excursion: Excursion) => {
  const e = excursion as OverNighExcursion;

  return e?.HotelId != null;
};

export interface OverNighExcursion extends Excursion {
  HotelId: number;
  Hotel: Hotel;
}

export interface ExcursionForm {
  Name: string;
  Places: number[];
  Activities: number[];
}

export interface OverNighExcursionForm extends ExcursionForm {
  HotelId: number;
}

export interface Hotel {
  Id: number;
  Name: string;
}
