import { UserIdentityForm } from "./auth";
import { Offer } from "./offers";

export interface Reserve {
  id: string;
  packageId: string;
  userIdentities: UserIdentityForm[];
  userIdentity: UserIdentityForm;
  cant: number;
  offers: Offer[];
}

export interface ReserveOnline extends Reserve {
  creditCard: number;
}

export interface ReserveFormType {
  id: string;
  isSingleOffer: boolean;
  userIdentities: UserIdentityForm[];
  userIdentity: UserIdentityForm;
}

export interface ReserveOnlineForm extends ReserveFormType {
  creditCard: number;
}
