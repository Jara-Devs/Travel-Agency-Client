import { Image } from "./api";
import { Hotel } from "./services";

export interface HotelOffer {
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
  piscina = 1,
  gimnasio = 2,
}
