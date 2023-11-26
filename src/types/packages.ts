import { Offer } from "./offers";

export interface Package {
  id: number;
  discount: number;
  description: string;
  offers: Offer[];
}

export interface PackageForm {
  discount: number;
  description: string;
  offers: number[];
}
