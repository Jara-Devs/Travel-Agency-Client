import { QueryOptions } from "odata-query";
import { apiOdataNoToken, apiSingleOdataNoToken, apiWithToken } from "./fetch";
import { HttpMethods } from "../types/api";
import {
  ExcursionOfferFormType,
  ExcursionOfferType,
  FlightOfferFormType,
  FlightOfferType,
  HotelOfferFormType,
  HotelOfferType,
  Reaction,
  ReactionForm,
} from "../types/offers";
import { Package, PackageFormType } from "../types/packages";

export const offerController = <T1, T2>(controller: string) => {
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

export const flightOffer = () =>
  offerController<FlightOfferType, FlightOfferFormType>("flightOffer");

export const hotelOffer = () =>
  offerController<HotelOfferType, HotelOfferFormType>("hotelOffer");

export const excursionOffer = () =>
  offerController<ExcursionOfferType, ExcursionOfferFormType>("excursionOffer");

export const reaction = () =>
  offerController<Reaction, ReactionForm>("reaction");

export const packageOffer = () =>
  offerController<Package, PackageFormType>("package");
