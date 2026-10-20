
import type { AxiosInstance } from "axios";

export function registerResponseInterceptor(
  client: AxiosInstance,
): number {
  return client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(error),
  );
}
