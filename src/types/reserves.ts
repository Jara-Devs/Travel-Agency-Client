import { Offer } from "./offers";

export interface UserIdentity {
  name: string;
  identityDocument: string;
}

export interface Reserve {
  id: string;
  packageId: string;
  userIdentities: UserIdentity[];
  userIdentity: UserIdentity;
  offers: Offer[];
}

export interface ReserveOnline extends Reserve {
  creditCard: number;
}

export interface ReserveFormType {
  id: string;
  isSingleOffer: boolean;
  userIdentities: UserIdentity[];
  userIdentity: UserIdentity;
}

export interface ReserveOnlineForm extends ReserveFormType {
  creditCard: number;
}