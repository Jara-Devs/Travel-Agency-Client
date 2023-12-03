import { Tourist, UserAgency, UserIdentity, UserIdentityForm } from "./auth";
import { Offer } from "./offers";
import { Package } from "./packages";

export interface Reserve {
  id: string;
  packageId: string;
  paymentId: string;
  package: Package;
  userIdentities: UserIdentity[];
  cant: number;
  offers: Offer[];
}

export interface Payment {
  price: number;
  userIdentityId: string;
  userIdentity: UserIdentity;
}

export interface PaymentOnline extends Payment {
  creditCard: string;
}

export interface PaymentTicket extends Payment {}

export interface ReserveOnline extends Reserve {
  creditCard: string;
  payment: PaymentOnline;
  user: Tourist;
}

export interface ReserveTicket extends Reserve {
  payment: PaymentTicket;
  user: UserAgency;
}

export interface ReserveFormType {
  id: string;
  isSingleOffer: boolean;
  userIdentities: UserIdentityForm[];
  userIdentity: UserIdentityForm;
}

export interface ReserveOnlineForm extends ReserveFormType {
  creditCard: string;
}

export interface ReserveTicketForm extends ReserveFormType {}
