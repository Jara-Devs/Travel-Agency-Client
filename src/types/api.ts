export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  value?: T;
}

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
