import { HttpMethods } from "../types/api";
import {
  AgencyRegisterForm,
  LoginForm,
  TouristRegisterForm,
  User,
  UserSystem,
  UserSystemFormType,
} from "../types/auth";
import {
  apiNoToken,
  apiWithToken,
  apiSingleOdataWithToken,
  apiOdataWithToken,
} from "./fetch";
import { QueryOptions } from "odata-query";
import { UserAgency, UserAgencyFormType } from "../types/auth";

export const authService = () => {
  function method<T>(data: T, endpoint: string) {
    return apiNoToken<T, User>(`auth/${endpoint}`, data, HttpMethods.POST);
  }

  const login = (data: LoginForm) => method<LoginForm>(data, "login");
  const registerAgency = (data: AgencyRegisterForm) =>
    method<AgencyRegisterForm>(data, "register/agency");
  const registerTourist = (data: TouristRegisterForm) =>
    method<TouristRegisterForm>(data, "register/tourist");
  const renew = () =>
    apiWithToken<{}, User>("auth/renew", {}, HttpMethods.POST);

  return { login, registerAgency, registerTourist, renew };
};

export const usersController = <T1, T2>(controller: string) => {
  const get = (odataQuery: Partial<QueryOptions<T1>>) =>
    apiOdataWithToken<T1>(controller, odataQuery);
  const getById = (odataQuery: Partial<QueryOptions<T1>>, id: number) =>
    apiSingleOdataWithToken<T1>(`${controller}/${id}`, odataQuery);

  const create = (form: T2) => apiWithToken(controller, form, HttpMethods.POST);
  const remove = (id: string) =>
    apiWithToken(`${controller}/${id}`, {}, HttpMethods.DELETE);

  return { get, getById, create, remove };
};

export const userAgency = () =>
  usersController<UserAgency, UserAgencyFormType>("userAgency");

export const userSystem = () =>
  usersController<UserSystem, UserSystemFormType>("userApp");
