import axios, { type AxiosInstance } from "axios";
import {
    getServicesConfig,
    registerServicesConfigListener,
} from "../config/services-config.js";
import { registerRequestInterceptor } from "../interceptors/request.interceptor.js";
import { registerResponseInterceptor } from "../interceptors/response.interceptor.js";
import {
    DEFAULT_HEADERS,
    DEFAULT_TIMEOUT,
} from "./client-config.js";

let axiosInstance: AxiosInstance | undefined;

function applyClientConfig(
    client: AxiosInstance,
    baseURL: string,
    timeout: number,
): void {
    client.defaults.baseURL = baseURL;
    client.defaults.timeout = timeout;
}

function createAxiosClient(): AxiosInstance {
    const config = getServicesConfig();

    const client = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout ?? DEFAULT_TIMEOUT,
        headers: { ...DEFAULT_HEADERS },
    });

    registerRequestInterceptor(client);
    registerResponseInterceptor(client);

    return client;
}

export function getAxiosClient(): AxiosInstance {
    if (!axiosInstance) {
        axiosInstance = createAxiosClient();
    }

    return axiosInstance;
}

export function refreshAxiosClientConfig(): void {
    if (!axiosInstance) {
        return;
    }

    const config = getServicesConfig();

    applyClientConfig(
        axiosInstance,
        config.baseURL,
        config.timeout ?? DEFAULT_TIMEOUT,
    );
}

registerServicesConfigListener((config) => {
    if (!axiosInstance) {
        return;
    }

    applyClientConfig(
        axiosInstance,
        config.baseURL,
        config.timeout ?? DEFAULT_TIMEOUT,
    );
});