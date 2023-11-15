import { QueryOptions } from "odata-query";
import {
  Excursion,
  ExcursionForm,
  OverNighExcursion,
  OverNighExcursionForm,
  TouristPlace,
  TouristPlaceForm,
} from "../types/sevice";
import { apiOdataNoToken, apiSingleOdataNoToken, apiWithToken } from "./fetch";
import { HttpMethods } from "../types/api";

export const serviceController = <T1, T2>(controller: string) => {
  const get = (odataQuery: Partial<QueryOptions<T1>>) =>
    apiOdataNoToken<T1>(controller, odataQuery);
  const getById = (
    odataQuery: Partial<QueryOptions<TouristPlace>>,
    id: number
  ) => apiSingleOdataNoToken<TouristPlace>(`${controller}/${id}`, odataQuery);

  const create = (form: T2) => apiWithToken(controller, form, HttpMethods.POST);
  const edit = (form: T2, id: number) =>
    apiWithToken(`${controller}/${id}`, form, HttpMethods.PUT);
  const remove = (id: number) =>
    apiWithToken(`${controller}/${id}`, {}, HttpMethods.DELETE);

  return { get, getById, create, edit, remove };
};

export const touristPlace = () =>
  serviceController<TouristPlace, TouristPlaceForm>("touristPlace");

export const excursion = () =>
  serviceController<Excursion, ExcursionForm>("excursion");

export const overNighExcursion = () =>
  serviceController<OverNighExcursion, OverNighExcursionForm>(
    "overNightExcursion"
  );
