import { ApiResponse, HttpMethods } from "../types/api";

const baseUrl: string | undefined = process.env.REACT_APP_API_URL;

export const fetchNoToken = (
  endpoint: string,
  data: any,
  method: HttpMethods = HttpMethods.GET
): Promise<Response> => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === HttpMethods.GET) {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (
  endpoint: string,
  data: any,
  method: HttpMethods = HttpMethods.GET
): Promise<Response> => {
  const url = `${baseUrl}/${endpoint}`;

  const token = localStorage.getItem("accessToken") || "";

  if (method === HttpMethods.GET) {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export async function apiWithToken<T1, T2>(
  endpoint: string,
  data: T1,
  method: HttpMethods = HttpMethods.GET
): Promise<ApiResponse<T2>> {
  try {
    const resp = await fetchWithToken(endpoint, data, method);
    const body = await resp.json();

    return body;
  } catch {
    return {
      ok: false,
      message: "Connection error",
    };
  }
}

export async function apiNoToken<T1, T2>(
  endpoint: string,
  data: T1,
  method: HttpMethods = HttpMethods.GET
): Promise<ApiResponse<T2>> {
  try {
    const resp = await fetchNoToken(endpoint, data, method);
    const body = await resp.json();

    return body;
  } catch {
    return {
      ok: false,
      message: "Connection error",
    };
  }
}
