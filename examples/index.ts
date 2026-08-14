import frankfurterV2Client from "../src";

const response = await frankfurterV2Client.getRate("EUR", "USD", {});
console.log(response);
