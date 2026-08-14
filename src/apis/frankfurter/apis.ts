/**
 * @author pontx-generator
 * @description API 类型定义
 */

import type * as schemas from './schemas';

// ============ common 模块 ============

export declare namespace common {
  export type GetRatesParams = {
    /**
     * @description Specific date (YYYY-MM-DD). Cannot be combined with from/to.
     */
    date?: string;
    /**
     * @description Start of date range (YYYY-MM-DD)
     */
    from?: string;
    /**
     * @description End of date range (YYYY-MM-DD). Defaults to today.
     */
    to?: string;
    /**
     * @description Base currency (default: EUR)
     */
    base?: string;
    /**
     * @description Comma-separated list of quote currencies to include
     */
    quotes?: string;
    /**
     * @description Comma-separated list of data providers to include
     */
    providers?: string;
    /**
     * @description Downsample rates by time period. Only applies to date ranges.
     */
    group?: 'week' | 'month';
    /**
     * @description Comma-separated list of optional fields to include per record. Currently supports `providers`, which adds an array of `{ key, date, rate }` objects per record showing each provider's individual observation date and rate. Outliers excluded from the blend (and providers whose rate was overridden by a currency peg) are flagged with `excluded: true`. The field is omitted on synthesized peg rows where no provider published the quote. In CSV output, the `providers` column is encoded as `KEY:RATE` pairs joined by `|`, with a trailing `\*` on excluded entries (e.g. `ECB:0.92|FED:1.50\*`).
     */
    expand?: 'providers';
  };

  export type GetRateParams = {
    /**
     * @description Specific date (YYYY-MM-DD). Cannot be combined with from/to.
     */
    date?: string;
    /**
     * @description Comma-separated list of data providers to include
     */
    providers?: string;
  };

  export type GetCurrenciesParams = {
    /**
     * @description Set to 'all' to include legacy currencies
     */
    scope?: 'all';
    /**
     * @description Comma-separated list of data providers to include
     */
    providers?: string;
  };

}

export type common = {
  /**
   * GET /rates
   * Returns exchange rates blended across providers. Without date params, returns the latest rates. Each record is a single currency pair. The response includes an identity record for the base currency (base equals quote, rate 1), subject to the quotes filter like any other record. Daily date ranges of any length are served, including full history. Limit: requests using `providers` or `expand=providers` recompute the blend per date, so at daily granularity they return 422 for ranges longer than 5 years. With `providers` naming at most 5 providers, a `quotes` list of at most 5 currencies lifts the cap; without `providers`, `expand=providers` ranges compute every currency regardless of `quotes`, so aggregate with `group=week` or `group=month`, add `providers`, or split the range into shorter requests.
   * @summary: Get exchange rates
   */
  getRates: (
    params: common.GetRatesParams,
    requestInit?: RequestInit,
  ) => Promise<Array<schemas.Rate>>;

  /**
   * GET /rate/{base}/{quote}
   * Returns the blended exchange rate for a single currency pair. Without a date param, returns the latest rate. A same-currency pair returns the identity rate of 1.
   * @summary: Get a single exchange rate pair
   */
  getRate: (
    /**
     * @description Base currency code
     */
    base: string,
    /**
     * @description Quote currency code
     */
    quote: string,
    params: common.GetRateParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.Rate>;

  /**
   * GET /currency/{code}
   * Returns details for a single currency, including provider information or peg metadata.
   * @summary: Get a single currency
   */
  getCurrency: (
    /**
     * @description ISO 4217 currency code
     */
    code: string,
    requestInit?: RequestInit,
  ) => Promise<schemas.CurrencyDetail>;

  /**
   * GET /currencies
   * Returns available currencies with their names and date ranges. By default, only active currencies are included.
   * @summary: Get available currencies
   */
  getCurrencies: (
    params: common.GetCurrenciesParams,
    requestInit?: RequestInit,
  ) => Promise<Array<schemas.Currency>>;

  /**
   * GET /providers
   * Returns available exchange rate data providers with their base currency.
   * @summary: Get available data providers
   */
  getProviders: (
    requestInit?: RequestInit,
  ) => Promise<Array<schemas.Provider>>;

};

// ============ API 集合类型 ============

/**
 * API 类型定义
 */
export type APIs = {
  /** common 模块 */
  common: common;
};

export declare namespace APIs {
  export { common };
}
