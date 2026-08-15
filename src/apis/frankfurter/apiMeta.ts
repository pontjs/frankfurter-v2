export const specMeta = {
  name: "Frankfurter API",
  hasTags: false,
  url: [
    {
      url: "https://api.frankfurter.dev/v2"
    }
  ],
  apis: {
    "getRates": {
      method: "GET",
      path: "/rates",
      consumes: [],
      produces: ["application/json","application/x-ndjson"],
      pathParams: null,
      queryParams: ["date", "from", "to", "base", "quotes", "providers", "group", "expand"],
      bodyParams: null
    },

    "getRate": {
      method: "GET",
      path: "/rate/{base}/{quote}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["base", "quote"],
      queryParams: ["date", "providers"],
      bodyParams: null
    },

    "getCurrency": {
      method: "GET",
      path: "/currency/{code}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["code"],
      queryParams: null,
      bodyParams: null
    },

    "getCurrencies": {
      method: "GET",
      path: "/currencies",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["scope", "providers"],
      bodyParams: null
    },

    "getProviders": {
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
