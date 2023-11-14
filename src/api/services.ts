import { QueryOptions } from "odata-query";
import { TouristPlace, TouristPlaceForm } from "../types/sevice";
import { apiOdataNoToken, apiSingleOdataNoToken, apiWithToken } from "./fetch";
import { HttpMethods } from "../types/api";

export const touristPlace = () => {
  const controller = "touristPlace";

  const get = (odataQuery: Partial<QueryOptions<TouristPlace>>) =>
    apiOdataNoToken<TouristPlace>(controller, odataQuery);
  const getById = apiSingleOdataNoToken<TouristPlace>;

  const create = (form: TouristPlaceForm) =>
    apiWithToken(controller, form, HttpMethods.POST);
  const edit = (form: TouristPlaceForm, id: number) =>
    apiWithToken(`${controller}/${id}`, form, HttpMethods.PUT);
  const remove = ( id: number) =>
    apiWithToken(`${controller}/${id}`, {}, HttpMethods.DELETE);

  return { get, getById, create, edit, remove };
};
