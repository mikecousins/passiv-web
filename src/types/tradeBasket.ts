export type TradeBasketType = {
  variety: string;
  tradingsymbol: string;
  exchange: string;
  transaction_type: string;
  quantity: number;
  order_type: string;
  price: number;
};

export type TradeType = {
  universal_symbol: object;
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
