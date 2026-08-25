import { createFrankfurterV2Client } from "../src";

const client = createFrankfurterV2Client();
const response = await client.getRate("EUR", "USD", {});
console.log(response);
