export const specMeta = {
  name: "Frankfurter API",
  hasTags: true,
  url: [
    {
      url: "https://api.frankfurter.dev/v2"
    }
  ],
  apis: {
    "common/getRates": {
      method: "GET",
      path: "/rates",
      consumes: [],
      produces: ["application/json","application/x-ndjson"],
      pathParams: null,
      queryParams: ["date", "from", "to", "base", "quotes", "providers", "group", "expand"],
      bodyParams: null
    },

    "common/getRate": {
      method: "GET",
      path: "/rate/{base}/{quote}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["base", "quote"],
      queryParams: ["date", "providers"],
      bodyParams: null
    },

    "common/getCurrency": {
      method: "GET",
      path: "/currency/{code}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["code"],
      queryParams: null,
      bodyParams: null
    },

    "common/getCurrencies": {
      method: "GET",
      path: "/currencies",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["scope", "providers"],
      bodyParams: null
    },

    "common/getProviders": {
      method: "GET",
      path: "/providers",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: null,
      bodyParams: null
    }
  }
} as const;
