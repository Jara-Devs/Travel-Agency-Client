export interface User {
  token: string;
  username: string;
  role: Roles;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface TouristRegisterForm {
  email: string;
  name: string;
  nationality: string;
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
