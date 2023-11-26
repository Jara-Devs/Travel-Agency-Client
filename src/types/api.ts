export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  value?: T;
}

export interface Image {
  id: string;
  name: string;
  url: string;
}

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
