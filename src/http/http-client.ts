import { getAxiosClient } from "../client/axios-client.js";
import { normalizeHttpError } from "./http-errors.js";
import type {
    HttpClient,
    HttpMethod,
    HttpRequestConfig,
} from "./http.types.js";

async function request<TResponse>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
): Promise<TResponse> {
    try {
        const response = await getAxiosClient().request<TResponse>({
            ...config,
            method,
            url,
            ...(data !== undefined ? { data } : {}),
        });

        return response.data;
    } catch (error: unknown) {
        throw normalizeHttpError(error);
    }
}

export const httpClient: HttpClient = {
    get<TResponse>(
        url: string,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        return request<TResponse>("GET", url, undefined, config);
    },

    post<TResponse, TBody = unknown>(
        url: string,
        body?: TBody,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        return request<TResponse>("POST", url, body, config);
    },

    put<TResponse, TBody = unknown>(
        url: string,
        body?: TBody,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        return request<TResponse>("PUT", url, body, config);
    },

    patch<TResponse, TBody = unknown>(
        url: string,
        body?: TBody,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        return request<TResponse>("PATCH", url, body, config);
    },

    delete<TResponse>(
        url: string,
        config?: HttpRequestConfig,
    ): Promise<TResponse> {
        return request<TResponse>("DELETE", url, undefined, config);
    },
};