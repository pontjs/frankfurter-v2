import { runCLI } from "pontx/sdk-cli";

export default runCLI({
  name: "pontx-frankfurter-v2",
  executeApi: {
    baseURL: "https://api.frankfurter.dev/v2",
  },
  generateSamples: [{
    case: "nodejs",
    "description": "Generate sample code for Node.js",
    "generateSample": async (api, options) => {
      return `import frankfurterV2Client from "@pontx/frankfurter-v2";

async function main() {
  const response = await frankfurterV2Client.getRate("EUR", "USD", {});
  console.log(response);
}

main();
      `;
    }
  }]
});
