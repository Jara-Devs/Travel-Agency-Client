import { QueryOptions } from "odata-query";
import {
  apiOdataWithToken,
  apiSingleOdataWithToken,
  apiWithToken,
} from "./fetch";
import {
  ReserveFormType,
  ReserveOnline,
  ReserveOnlineForm,
  ReserveTicket,
} from "../types/reserves";
import { HttpMethods } from "../types/api";

export const reserveTicket = () => {
  const controller = "reserveTicket";
  const get = (odataQuery: Partial<QueryOptions<ReserveTicket>>) =>
    apiOdataWithToken<ReserveTicket>(controller, odataQuery);
  const getById = (
    odataQuery: Partial<QueryOptions<ReserveTicket>>,
    id: number
  ) =>
    apiSingleOdataWithToken<ReserveTicket>(`${controller}/${id}`, odataQuery);

  const create = (form: ReserveFormType) =>
    apiWithToken(controller, form, HttpMethods.POST);

  return { get, getById, create };
};

export const reserveOnline = () => {
  const controller = "reserveTourist";
  const get = (odataQuery: Partial<QueryOptions<ReserveOnline>>) =>
    apiOdataWithToken<ReserveOnline>(controller, odataQuery);
  const getById = (
    odataQuery: Partial<QueryOptions<ReserveOnline>>,
    id: number
  ) =>
    apiSingleOdataWithToken<ReserveOnline>(`${controller}/${id}`, odataQuery);

  const create = (form: ReserveOnlineForm) =>
    apiWithToken(controller, form, HttpMethods.POST);

  return { get, getById, create };
};
