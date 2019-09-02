import { Currency } from './currency';

interface Account {
  id: string;
  number: string;
}

export type Brokerage = {
  id: string;
  name: string;
  url: string;
};

export interface BrokerageAuthorization {
  id: string;
  created_date: string;
  brokerage: Brokerage;
  name: string;
  type: string;
}

export interface Symbol {
  id: string;
  symbol: string;
  description: string;
  security_type: string;
  currency: Currency;
}

export interface Balance {
  currency: Currency;
  cash: number;
}

export interface Position {
  symbol: Symbol;
  price: number;
  units: number;
  excluded: boolean;
  quotable: boolean;
  uniformEquity: number;
  actualPercentage: number;
}

export interface TargetPosition {
  id: string;
  symbol: string;
  percent: number;
  meta: object;
  fullSymbol: Symbol | undefined;
  actualPercentage: number;
  excluded: boolean;
}

interface IdealPosition {
  symbol: string;
  units: number;
}

interface ExcludedPosition {
  symbol: string;
}

interface Trade {
  action: string;
}

export interface CalculatedTrades {
  id: string;
  trades: Trade[];
}

export interface Settings {
  prevent_currency_conversion: boolean;
  hard_currency_separation: boolean;
  buy_only: boolean;
  cash_optimizer: boolean;
  notify_frequency: string;
  drift_threshold: number;
  preferred_currency: string;
  target_initialized: boolean;
}

export interface Error {
  code: string;
  meta: {
    symbols: any[];
  };
}

export interface GroupInfoData {
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
}
