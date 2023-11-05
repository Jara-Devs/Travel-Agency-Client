export interface User {
  accessToken: string;
  username: string;
  role: string;
}

export interface LoginForm {
  user: string;
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
