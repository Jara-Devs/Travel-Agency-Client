import { QueryOptions } from "odata-query";
import {
  apiOdataWithToken,
  apiSingleOdataWithToken,
  apiWithToken,
} from "./fetch";
import { Reserve, ReserveFormType } from "../types/reserves";
import { HttpMethods } from "../types/api";

export const reserveTicket = () => {
  const controller = "reserveTicket";
  const get = (odataQuery: Partial<QueryOptions<Reserve>>) =>
    apiOdataWithToken<Reserve>(controller, odataQuery);
  const getById = (odataQuery: Partial<QueryOptions<Reserve>>, id: number) =>
    apiSingleOdataWithToken<Reserve>(`${controller}/${id}`, odataQuery);

  const create = (form: ReserveFormType) =>
    apiWithToken(controller, form, HttpMethods.POST);

  return { get, getById, create };
};
