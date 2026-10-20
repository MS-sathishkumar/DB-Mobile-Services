import axios from "axios";
import type { HttpError } from "./http.types.js";

function getServerMessage(data: unknown): string | undefined {
    if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
    ) {
        return data.message;
    }

    return undefined;
}

export function isHttpError(error: unknown): error is HttpError {
    if (typeof error !== "object" || error === null) {
        return false;
    }

    const candidate = error as Partial<HttpError>;

    return (
        candidate.name === "HttpError" &&
        typeof candidate.message === "string" &&
        (typeof candidate.status === "number" ||
            candidate.status === null) &&
        (typeof candidate.code === "string" ||
            candidate.code === null) &&
        typeof candidate.isNetworkError === "boolean" &&
        typeof candidate.isTimeout === "boolean" &&
        typeof candidate.isCancelled === "boolean" &&
        "data" in candidate
    );
}

export function normalizeHttpError(error: unknown): HttpError {
    // Preserve an error that has already been normalized.
    if (isHttpError(error)) {
        return error;
    }

    if (axios.isCancel(error)) {
        return {
            name: "HttpError",
            message: "Request cancelled",
            status: null,
            code: "ERR_CANCELED",
            data: null,
            isNetworkError: false,
            isTimeout: false,
            isCancelled: true,
        };
    }

    if (axios.isAxiosError(error)) {
        const isTimeout =
            error.code === "ECONNABORTED" ||
            error.code === "ETIMEDOUT";

        const isCancelled = error.code === "ERR_CANCELED";
        const isNetworkError =
            !error.response && !isTimeout && !isCancelled;

        return {
            name: "HttpError",
            message:
                getServerMessage(error.response?.data) ??
                (isTimeout
                    ? "Request timed out"
                    : error.message || "An HTTP request failed"),
            status: error.response?.status ?? null,
            code: error.code ?? null,
            data: error.response?.data ?? null,
            isNetworkError,
            isTimeout,
            isCancelled,
        };
    }

    return {
        name: "HttpError",
        message:
            error instanceof Error
                ? error.message
                : "An unexpected error occurred",
        status: null,
        code: null,
        data: null,
        isNetworkError: false,
        isTimeout: false,
        isCancelled: false,
    };
}