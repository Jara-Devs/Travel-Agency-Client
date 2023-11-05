import { HttpMethods } from "../types/api";
import {
  AgencyRegisterForm,
  LoginForm,
  TouristRegisterForm,
  User,
} from "../types/auth";
import { apiNoToken, apiWithToken } from "./fetch";

export const authService = () => {
  function method<T>(data: T, endpoint: string) {
    return apiNoToken<T, User>(`auth/${endpoint}`, data, HttpMethods.POST);
  }

  const login = (data: LoginForm) => method<LoginForm>(data, "login");
  const registerAgency = (data: AgencyRegisterForm) =>
    method<AgencyRegisterForm>(data, "registerAgency");
  const registerTourist = (data: TouristRegisterForm) =>
    method<TouristRegisterForm>(data, "touristAgency");
  const renew = () =>
    apiWithToken<{}, User>("auth/renew", {}, HttpMethods.POST);

  return { login, registerAgency, registerTourist, renew };
};
