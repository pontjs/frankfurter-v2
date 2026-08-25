import { createGracefulClient, type GracefulClient } from "@pontx/sdk";
import type { APIs } from "./apis/frankfurter/apis";
import { specMeta } from "./apis/frankfurter/apiMeta";

const DEFAULT_BASE_URL = "https://api.frankfurter.dev/v2";

export type FrankfurterV2Client = GracefulClient<APIs>;

export interface FrankfurterV2ClientOptions {
  /** Override the official Frankfurter v2 origin, primarily for testing. */
  baseUrl?: string;
  /** Provide a custom fetch implementation without changing global state. */
  fetch?: typeof globalThis.fetch;
}

/** Create an isolated Frankfurter v2 SDK client. */
export function createFrankfurterV2Client(
  options: FrankfurterV2ClientOptions = {},
): FrankfurterV2Client {
  return createGracefulClient<APIs>({
    pontxSpecMeta: specMeta as never,
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    baseRequestFn: (url, init) => {
      const fetchRequest = options.fetch ?? globalThis.fetch;
      return fetchRequest(url, init as RequestInit).then((response) => response.json());
    },
  });
}

/** @deprecated Prefer createFrankfurterV2Client() so runtime configuration is explicit. */
const frankfurterV2Client = createFrankfurterV2Client();

export { frankfurterV2Client };
export default frankfurterV2Client;
