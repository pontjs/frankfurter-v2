import { createGracefulClient } from "@pontx/sdk";
import { APIs } from "./apis/frankfurter/apis";
import { specMeta } from "./apis/frankfurter/apiMeta";

const frankfurterV2Client = createGracefulClient<APIs>({
  pontxSpecMeta: specMeta as any,
  baseUrl: "https://api.frankfurter.dev/v2",
  baseRequestFn: (url, init) => {
    return fetch(url, init).then(res => res.json());
  },
});

export { frankfurterV2Client };

export default frankfurterV2Client;
