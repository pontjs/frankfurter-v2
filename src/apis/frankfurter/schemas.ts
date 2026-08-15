/**
 * @title Rate record
 */
export type Rate = {
  /**
   * @description The date of the rate
   */
  date: string;
  /**
   * @description Base currency code
   */
  base: string;
  /**
   * @description Quote currency code
   */
  quote: string;
  /**
   * @description Exchange rate value
   */
  rate: number;
  /**
   * @description Per-provider rates for this pair. Present only when `expand=providers` is set. Each entry has the provider's observation date and published rate (rebased to the row's base). Entries with `excluded: true` did not contribute to the blended `rate` — either flagged as outliers by the consensus filter, or overridden by a currency peg. Omitted on synthesized peg rows where no provider published the quote.
   */
  providers?: Array<{
    /**
     * @description Provider key
     */
    key: string;
    /**
     * @description Provider observation date used for this entry
     */
    date: string;
    /**
     * @description Provider's rate, rebased to the row's base
     */
    rate: number;
    /**
     * @description Present and true when this entry did not contribute to the blended rate
     */
    excluded?: boolean
  }>;
}

/**
 * @title Currency summary
 */
export type Currency = {
  /**
   * @description ISO 4217 currency code
   */
  iso_code: string;
  /**
   * @description ISO 4217 numeric code
   */
  iso_numeric?: string;
  /**
   * @description Full currency name
   */
  name: string;
  /**
   * @description Currency symbol
   */
  symbol?: string;
  /**
   * @description Earliest available date
   */
  start_date?: string;
  /**
   * @description Latest available date
   */
  end_date?: string;
}

/**
 * @title Currency details
 */
export type CurrencyDetail = {
  /**
   * @description ISO 4217 currency code
   */
  iso_code: string;
  /**
   * @description ISO 4217 numeric code
   */
  iso_numeric?: string;
  /**
   * @description Full currency name
   */
  name: string;
  /**
   * @description Currency symbol
   */
  symbol?: string;
  /**
   * @description Provider keys that publish this currency
   */
  providers?: Array<string>;
  /**
   * @description Peg metadata, present only for pegged currencies
   */
  peg?: {
    base?: string;
    rate?: number;
    authority?: string;
    source?: string
  };
}

/**
 * @title Exchange-rate data provider
 */
export type Provider = {
  /**
   * @description Provider identifier
   */
  key: string;
  /**
   * @description Full provider name
   */
  name: string;
  /**
   * @description ISO 3166-1 alpha-2 country code
   */
  country_code?: string;
  /**
   * @description Official rate type as used by the source
   */
  rate_type?: string;
  /**
   * @description Base currency for published rates
   */
  pivot_currency?: string;
  /**
   * @description Link to the data source
   */
  data_url?: string;
  /**
   * @description Link to terms of use
   */
  terms_url?: string;
  /**
   * @description Earliest available date
   */
  start_date?: string;
  /**
   * @description Latest available date
   */
  end_date?: string;
  /**
   * @description How often the provider publishes rates. Determines the unit of publishes_missed: a count of days, ISO weeks, or calendar months. Null for historical-only providers with no scheduled cadence.
   */
  publish_cadence?: 'daily' | 'weekly' | 'monthly' | null;
  /**
   * @description Number of expected publishes missed since end_date, in units of publish_cadence. For daily providers, counts scheduled publish days strictly between end_date and today. For weekly and monthly providers, counts ISO weeks or calendar months between the latest imported bucket and the bucket whose publish window has already started. Null when the provider has no scheduled cadence or no imported data.
   */
  publishes_missed?: number;
  /**
   * @description Currency codes covered by this provider
   */
  currencies: Array<string>;
}