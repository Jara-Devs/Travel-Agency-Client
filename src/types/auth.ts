export interface User {
  id: string;
  token: string;
  username: string;
  role: Roles;
}

export interface UserIdentity {
  id: string;
  name: string;
  identityDocument: string;
  nationality: string;
}

export interface UserIdentityForm {
  name: string;
  identityDocument: string;
  nationality: string;
}

export interface UserTouristContext extends User {
  useIdentity: UserIdentity;
}

export interface UserAgencyContext extends User {
  agencyId: string;
  agencyName: string;
  faxNumber: number;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface TouristRegisterForm {
  email: string;
  name: string;
  userIdentity: UserIdentityForm;
  password: string;
  confirm: string;
}

export interface AgencyRegisterForm {
  email: string;
  name: string;
  nameAgency: string;
  password: string;
  confirm: string;
  Direction: string;
  fax: string;
}

export enum Roles {
  User = "User",
  Tourist = "Tourist",
  AdminAgency = "AdminAgency",
  ManagerAgency = "ManagerAgency",
  EmployeeAgency = "EmployeeAgency",
  AdminApp = "AdminApp",
  EmployeeApp = "EmployeeApp",
}

export interface UserAgency {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserAgencyFormType {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserSystem {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserSystemFormType {
  name: string;
  email: string;
  password: string;
  role: string;
}
