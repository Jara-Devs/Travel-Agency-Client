import { QueryOptions } from "odata-query";
import { TouristPlace } from "../types/sevice";
import { apiOdataNoToken, apiSingleOdataNoToken } from "./fetch";

export const touristPlace = () => {
  const controller = "touristPlace";

  const get = (odataQuery: Partial<QueryOptions<TouristPlace>>) =>
    apiOdataNoToken<TouristPlace>(controller, odataQuery);
  const getById = apiSingleOdataNoToken<TouristPlace>;

  return { get, getById };
};
