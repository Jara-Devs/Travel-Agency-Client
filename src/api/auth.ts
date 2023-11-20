import { HttpMethods } from "../types/api";
import {
  AgencyRegisterForm,
  LoginForm,
  TouristRegisterForm,
  User,
} from "../types/auth";
import { apiNoToken, apiWithToken, apiOdataNoToken, apiSingleOdataNoToken, apiSingleOdataWithToken, apiOdataWithToken } from "./fetch";
import { QueryOptions } from "odata-query";
import {AgencyUser, AgencyUserFormType} from "../types/services";


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
  const getById = (
    odataQuery: Partial<QueryOptions<T1>>,
    id: number
  ) => apiSingleOdataWithToken<T1>(`${controller}/${id}`, odataQuery);

  const create = (form: T2) => apiWithToken(controller, form, HttpMethods.POST);
  const edit = (form: T2, id: number) =>
    apiWithToken(`${controller}/${id}`, form, HttpMethods.PUT);
  const remove = (id: number) =>
    apiWithToken(`${controller}/${id}`, {}, HttpMethods.DELETE);

  return { get, getById, create, edit, remove };
};

export const agencyUser = () =>
usersController<AgencyUser, AgencyUserFormType>("userAgency");
