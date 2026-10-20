export type AccessTokenProvider = () =>
  | string
  | null
  | undefined
  | Promise<string | null | undefined>;

let accessTokenProvider: AccessTokenProvider = () => null;

export function setAccessTokenProvider(
  provider: AccessTokenProvider,
): void {
  accessTokenProvider = provider;
}

export async function getAccessToken(): Promise<
  string | null | undefined
> {
  return accessTokenProvider();
}