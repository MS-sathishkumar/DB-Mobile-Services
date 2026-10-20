export {
    configureServices,
    getServicesConfig,
} from "./config/services-config.js";

export {
    setAccessTokenProvider,
    getAccessToken,
} from "./auth/token-provider.js";

export {
    getAxiosClient,
    refreshAxiosClientConfig,
} from "./client/axios-client.js";

export { httpClient } from "./http/http-client.js";

export {
    isHttpError,
    normalizeHttpError,
} from "./http/http-errors.js";

export type {
    HttpClient,
    HttpError,
    HttpMethod,
    HttpRequestConfig,
} from "./http/http.types.js";

export type {
    AccessTokenProvider,
} from "./auth/token-provider.js";

export type {
    ServicesConfig,
} from "./config/services-config.js";