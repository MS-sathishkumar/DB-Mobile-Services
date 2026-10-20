import type {
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import { getAccessToken } from "../auth/token-provider.js";

export function registerRequestInterceptor(
    client: AxiosInstance,
): number {
    return client.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const token = await getAccessToken();

            // Preserve a request-specific Authorization header.
            if (!config.headers.has("Authorization") && token) {
                config.headers.set("Authorization", `Bearer ${token}`);
            }

            return config;
        },
    );
}