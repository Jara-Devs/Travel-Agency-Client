export interface UserIdentity {
  name: string;
  identityDocument: string;
}

export interface Reserve {
  id: string;
  packageId: string;
  userIdentities: UserIdentity[];
  userIdentity: UserIdentity;
}

export interface ReserveOnline extends Reserve {
  creditCard: number;
}

export interface ReserveFormType {
  packageId: string;
  userIdentities: UserIdentity[];
  userIdentity: UserIdentity;
}

export interface ReserveOnlineForm extends ReserveFormType {
  creditCard: number;
}
