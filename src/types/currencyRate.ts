import { Currency } from './currency';

export interface CurrencyRate {
  src: Currency;
  dst: Currency;
  exchange_rate: number;
}
