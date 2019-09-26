import { Currency } from './currency';

export type Account = {
  id: string;
  number: string;
};

export type Brokerage = {
  id: string;
  name: string;
  url: string;
};

export type BrokerageAuthorization = {
  id: string;
  created_date: string;
  brokerage: Brokerage;
  name: string;
  type: string;
};

export type Symbol = {
  id: string;
  symbol: string;
  description: string;
  security_type: string;
  currency: Currency;
};

export type Balance = {
  currency: Currency;
  cash: number;
};

export type Position = {
  symbol: Symbol;
  price: number;
  units: number;
  excluded: boolean;
  quotable: boolean;
  uniformEquity: number;
  actualPercentage: number;
};

export type TargetPosition = {
  id: string;
  symbol: string;
  percent: number;
  meta: object;
  fullSymbol: Symbol | undefined;
  actualPercentage: number;
  is_excluded: boolean;
  is_supported: boolean;
};

export type IdealPosition = {
  symbol: string;
  units: number;
};

export type ExcludedPosition = {
  symbol: string;
};

export type Trade = {
  action: string;
};

export type CalculatedTrades = {
  id: string;
  trades: Trade[];
};

export type Settings = {
  prevent_currency_conversion: boolean;
  hard_currency_separation: boolean;
  buy_only: boolean;
  cash_optimizer: boolean;
  notify_frequency: string;
  drift_threshold: number;
  preferred_currency: string;
  target_initialized: boolean;
};

export type Error = {
  code: string;
  meta?: {
    symbols: any[];
  };
};

export type GroupInfoData = {
  accounts: Account[];
  brokerage_authorizations: BrokerageAuthorization[];
  symbols: Symbol[];
  quotable_symbols: Symbol[];
  balances: Balance[];
  positions: Position[];
  target_positions: TargetPosition[];
  ideal_positions: IdealPosition[];
  excluded_positions: ExcludedPosition[];
  calculated_trades: CalculatedTrades;
  accuracy: number;
  settings: Settings;
  error: Error;
};
