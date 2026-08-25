import { afterEach, describe, expect, it, vi } from "vitest";
import frankfurterV2Client, {
  createFrankfurterV2Client,
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
    const client = createFrankfurterV2Client({ fetch: fetchMock });

    await expect(
      client.getRate("EUR", "USD", {
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
    const client = createFrankfurterV2Client();
    expect(() => (client as any).common).toThrow('API "common" not found');
  });

  it("creates isolated clients with their own runtime origin", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ rate: 1.1 }), {
        headers: { "content-type": "application/json" },
      }),
    );
    const client = createFrankfurterV2Client({
      baseUrl: "https://rates.example.test/v2",
      fetch: fetchMock,
    });

    await client.getRate("EUR", "USD", {});

    expect(fetchMock).toHaveBeenCalledWith(
      "https://rates.example.test/v2/rate/EUR/USD",
      expect.any(Object),
    );
  });
});
