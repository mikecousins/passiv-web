import { Currency } from './currency';

type Meta = {
  type: string;
  status: string;
  is_billing: boolean;
  is_primary: boolean;
  client_account_type: string;
  institution_name: string;
};

export type CashRestriction = {
  id: string;
  account: string;
  currency: string;
  type: string;
  amount: number;
};

export type Account = {
  loading: JSX.Element;
  id: string;
  brokerage_authorization: string;
  portfolio_group: string;
  name: string;
  institution_name: string;
  number: string;
  meta: Meta;
  cash_restrictions: CashRestriction[];
};

export type NestedSymbol = {
  id: string;
  symbol: string;
  security_type?: string | null;
  name: string;
  exchange: string;
  currency: string;
  type: string;
};

export type Symbol = {
  id: string;
  description: string;
  symbol: NestedSymbol;
  local_id: string;
  security_type?: string;
  listing_exchange: string;
  is_quotable: boolean;
  is_tradable: boolean;
};

export type Position = {
  symbol: Symbol;
  price: number;
  units: number;
  fractional_units: number;
  open_pnl: number;
  currency: Currency;
};
