import { HttpMethods, Image } from "../types/api";
import { apiNoToken } from "./fetch";

export const upload = () => `${process.env.REACT_APP_API_URL}/image`;

export const getRandomImage = () => {
  return apiNoToken<{}, Image[]>("image", {}, HttpMethods.GET);
};
