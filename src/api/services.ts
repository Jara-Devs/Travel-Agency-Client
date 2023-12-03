import { QueryOptions } from "odata-query";
import {
  Excursion,
  ExcursionFormType,
  Flight,
  FlightFormType,
  Hotel,
  HotelFormType,
  TouristActivity,
  TouristActivityFormType,
  TouristPlace,
  Facility,
  TouristPlaceFormType,
  FacilityFormType,
  City,
  CityFormType,
} from "../types/services";
import { apiOdataNoToken, apiSingleOdataNoToken, apiWithToken } from "./fetch";
import { HttpMethods } from "../types/api";

export const serviceController = <T1, T2>(controller: string) => {
  const get = (odataQuery: Partial<QueryOptions<T1>>) =>
    apiOdataNoToken<T1>(controller, odataQuery);
  const getById = (odataQuery: Partial<QueryOptions<T1>>, id: number) =>
    apiSingleOdataNoToken<T1>(`${controller}/${id}`, odataQuery);

  const create = (form: T2) => apiWithToken(controller, form, HttpMethods.POST);
  const edit = (form: T2, id: string) =>
    apiWithToken(`${controller}/${id}`, form, HttpMethods.PUT);
  const remove = (id: string) =>
    apiWithToken(`${controller}/${id}`, {}, HttpMethods.DELETE);

  return { get, getById, create, edit, remove };
};

export const touristPlace = () =>
  serviceController<TouristPlace, TouristPlaceFormType>("touristPlace");

export const touristActivity = () =>
  serviceController<TouristActivity, TouristActivityFormType>(
    "touristActivity"
  );

export const excursion = () =>
  serviceController<Excursion, ExcursionFormType>("excursion");

export const hotel = () => serviceController<Hotel, HotelFormType>("hotel");

export const activity = () =>
  serviceController<TouristActivity, TouristActivityFormType>(
    "touristactivity"
  );

export const flight = () => serviceController<Flight, FlightFormType>("flight");

export const facility = () =>
  serviceController<Facility, FacilityFormType>("facility");

export const city = () => serviceController<City, CityFormType>("city");
