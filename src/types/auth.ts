export interface User {
  token: string;
  username: string;
  role: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface TouristRegisterForm {
  email: string;
  name: string;
  country: string;
  password: string;
  confirm: string;
}

export interface AgencyRegisterForm {
  email: string;
  name: string;
  password: string;
  confirm: string;
  Direction: string;
  fax: string;
}
