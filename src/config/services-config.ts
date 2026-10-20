import {
    setAccessTokenProvider,
    type AccessTokenProvider,
} from "../auth/token-provider.js";

export interface ServicesConfig {
    baseURL: string;
    timeout?: number;
    getAccessToken?: AccessTokenProvider;
}

type ConfigListener = (config: ServicesConfig) => void;

let currentConfig: ServicesConfig | undefined;
const configListeners = new Set<ConfigListener>();

export function configureServices(config: ServicesConfig): void {
    const baseURL = config.baseURL.trim();

    if (!baseURL) {
        throw new Error(
            "Services configuration requires a non-empty baseURL.",
        );
    }

    if (
        config.timeout !== undefined &&
        (!Number.isFinite(config.timeout) || config.timeout <= 0)
    ) {
        throw new Error("Services timeout must be a positive number.");
    }

    currentConfig = {
        ...config,
        baseURL,
        timeout: config.timeout ?? 30_000,
    };

    setAccessTokenProvider(config.getAccessToken ?? (() => null));

    for (const listener of configListeners) {
        listener(currentConfig);
    }
}

export function getServicesConfig(): ServicesConfig {
    if (!currentConfig) {
        throw new Error(
            "Services are not configured. Call configureServices() first.",
        );
    }

    return currentConfig;
}

export function registerServicesConfigListener(
    listener: ConfigListener,
): () => void {
    configListeners.add(listener);

    if (currentConfig) {
        listener(currentConfig);
    }

    return () => {
        configListeners.delete(listener);
    };
}
