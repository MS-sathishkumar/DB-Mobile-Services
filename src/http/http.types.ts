
import type { AxiosRequestConfig } from "axios";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export type HttpRequestConfig = Omit<
  AxiosRequestConfig,
  "url" | "method" | "data"
>;

export interface HttpError {
  name: "HttpError";
  message: string;
  status: number | null;
  code: string | null;
  data: unknown;
  isNetworkError: boolean;
  isTimeout: boolean;
  isCancelled: boolean;
}

export interface HttpClient {
  get<TResponse>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<TResponse>;

  post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: HttpRequestConfig,
  ): Promise<TResponse>;

  put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: HttpRequestConfig,
  ): Promise<TResponse>;

  patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: HttpRequestConfig,
  ): Promise<TResponse>;

  delete<TResponse>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<TResponse>;
}
