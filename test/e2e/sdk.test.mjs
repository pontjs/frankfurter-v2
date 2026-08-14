import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

test("the built SDK completes a real HTTP round trip through its public API", async (context) => {
  const requests = [];
  const payload = { date: "2026-08-14", base: "EUR", quote: "USD", rate: 1.1 };
  const server = createServer((request, response) => {
    requests.push({
      method: request.method,
      url: request.url,
      headers: request.headers,
    });
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(payload));
  });
  await new Promise((resolveListen) =>
    server.listen(0, "127.0.0.1", resolveListen),
  );
  context.after(() =>
    new Promise((resolveClose) => server.close(resolveClose)),
  );

  const address = server.address();
  assert(address && typeof address === "object");
  const localOrigin = `http://127.0.0.1:${address.port}`;
  const nativeFetch = globalThis.fetch;
  globalThis.fetch = (input, init) => {
    const requested = new URL(String(input));
    return nativeFetch(
      new URL(`${requested.pathname}${requested.search}`, localOrigin),
      init,
    );
  };
  context.after(() => {
    globalThis.fetch = nativeFetch;
  });

  const esm = await import(
    `${pathToFileURL(resolve(repositoryRoot, "dist/index.mjs")).href}?e2e=${Date.now()}`,
  );
  const result = await esm.default.common.getRate("EUR", "USD", {
    date: "2026-08-14",
  });
  assert.deepEqual(result, payload);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].method, "GET");
  assert.equal(requests[0].url, "/v2/rate/EUR/USD?date=2026-08-14");

  const require = createRequire(import.meta.url);
  const cjs = require(resolve(repositoryRoot, "dist/index.js"));
  assert.equal(cjs.default, cjs.frankfurterV2Client);
});

test("the CLI and npm package surface are publishable", async () => {
  const { stdout: help } = await execFileAsync(
    process.execPath,
    [resolve(repositoryRoot, "dist/bin/cli.cjs"), "--help"],
    { cwd: repositoryRoot },
  );
  assert.match(help, /pontx-frankfurter-v2/);

  const { stdout } = await execFileAsync(
    "npm",
    ["pack", "--dry-run", "--json"],
    { cwd: repositoryRoot },
  );
  const [packed] = JSON.parse(stdout);
  const files = new Set(packed.files.map((file) => file.path));
  for (const expected of [
    "README.md",
    "dist/index.d.ts",
    "dist/index.js",
    "dist/index.mjs",
    "dist/bin/api-lock.json",
    "dist/bin/cli.cjs",
  ]) {
    assert(files.has(expected), `missing npm artifact: ${expected}`);
  }
});
