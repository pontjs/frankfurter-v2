import { readFile, writeFile } from "node:fs/promises";

const generatedPath = new URL("../src/apis/frankfurter/schemas.ts", import.meta.url);
const generated = await readFile(generatedPath, "utf8");
const marker = "publish_cadence?: any;";
if (!generated.includes(marker)) {
  throw new Error("Expected Frankfurter publish_cadence field was not generated");
}
await writeFile(
  generatedPath,
  generated.replace(marker, "publish_cadence?: 'daily' | 'weekly' | 'monthly' | null;")
);
