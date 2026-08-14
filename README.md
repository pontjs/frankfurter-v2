# @pontx/frankfurter-v2

[![SDK quality: unit 100%, E2E passing](https://pontx.dev/badges/sdk/frankfurter-v2.svg)](https://pontx.dev/en/sdks/frankfurter-v2#quality)

Type-safe TypeScript SDK and dedicated CLI for the official, open-source [Frankfurter v2 API](https://frankfurter.dev/).

## Install

```bash
npm install @pontx/frankfurter-v2
```

## SDK

```ts
import frankfurterV2Client from "@pontx/frankfurter-v2";

const result = await frankfurterV2Client.common.getRate("EUR", "USD", {});
```

## CLI

```bash
npm install --global @pontx/frankfurter-v2
pontx-frankfurter-v2 --help
pontx-frankfurter-v2 call common.getRate --base EUR --quote USD --dry-run
```

The package contains generated code and API metadata only. Exchange-rate data remains subject to the upstream providers' terms.

- [Pontx Hub documentation](https://pontx.dev/en/sdks/frankfurter-v2)
- [Source](https://github.com/pontjs/frankfurter-v2)
- License: MIT
