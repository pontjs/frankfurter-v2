import frankfurterV2Client from "../src";

const response = await frankfurterV2Client.common.getRate("EUR", "USD", {});
console.log(response);
