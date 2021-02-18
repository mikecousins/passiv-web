import { Currency } from './currency';

export type TradeBasketType = {
  variety: string;
  tradingsymbol: string;
  exchange: string;
  transaction_type: string;
  quantity: number;
  order_type: string;
  price: number;
};

export type UniversalSymbolType = {
  currency: Currency[];
  description: string;
  id: string;
  symbol: string;
};

export type TradeType = {
  universal_symbol: UniversalSymbol[];
  description: string;
  account: string;
  action: string;
  id: string;
  modified_units: number;
  price: number;
  sequence: number;
  skip_trade: boolean;
  symbol: string;
  symbol_in_target: boolean;
  units: number;
};
