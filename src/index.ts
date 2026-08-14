import { createGracefulClient, type GracefulClient } from "@pontx/sdk";
import { APIs } from "./apis/frankfurter/apis";
import { specMeta } from "./apis/frankfurter/apiMeta";

const frankfurterV2Client = createGracefulClient<APIs>({
  pontxSpecMeta: specMeta as any,
  baseUrl: "https://api.frankfurter.dev/v2",
  baseRequestFn: (url, init) => {
    return fetch(url, init).then(res => res.json());
  },
}) as GracefulClient<APIs> & APIs["common"];

export { frankfurterV2Client };

export default frankfurterV2Client;
