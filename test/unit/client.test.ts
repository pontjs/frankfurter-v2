import { afterEach, describe, expect, it, vi } from "vitest";
import frankfurterV2Client, {
  frankfurterV2Client as namedClient,
} from "../../src/index";

describe("@pontx/frankfurter-v2", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exports the same client as the default and named entrypoint", () => {
    expect(frankfurterV2Client).toBe(namedClient);
  });

  it("serializes path and query parameters and decodes the response", async () => {
    const payload = {
      date: "2026-08-14",
      base: "EUR",
      quote: "USD",
      rate: 1.1,
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(payload), {
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      frankfurterV2Client.getRate("EUR", "USD", {
        date: "2026-08-14",
      }),
    ).resolves.toEqual(payload);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v2/rate/EUR/USD?date=2026-08-14",
      expect.objectContaining({
        method: "GET",
        headers: { Accept: "application/json" },
      }),
    );
  });

  it("does not synthesize a common controller for untagged Endpoints", () => {
    expect(() => (frankfurterV2Client as any).common).toThrow('API "common" not found');
  });
});
