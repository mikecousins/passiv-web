import { Currency } from './currency';
import { Account } from './account';
import { Authorization } from './authorization';
import { AssetClassPriorities, ModelPortfolio } from './modelPortfolio';

export type Symbol = {
  id: string;
  symbol: string;
  description: string;
  security_type?: string;
  currency: Currency;
  type: {
    id: string;
    code: string;
    is_supported: boolean;
  };
};

export type Balance = {
  currency: Currency;
  cash: number;
};

export type Position = {
  symbol: Symbol;
  price: number;
  units: number;
  fractional_units: number;
  excluded: boolean;
  quotable: boolean;
  uniformEquity: number;
  actualPercentage: number;
  currency: Currency;
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
  account: Account;
  action: string;
  skip_trade: boolean;
  symbol_in_target: boolean;
  universal_symbol: Symbol;
};

export type CalculatedTrades = {
  id: string;
  trades: Trade[];
};

export type ForexRate = {
  src: {
    id: string;
    name: string;
    code: string;
  };
  dst: {
    id: string;
    name: string;
    code: string;
  };
  exchange_rate: number;
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
  order_targets_by: number;
  rebalance_by_asset_class: boolean;
  model_portfolio_changed: boolean;
  new_assets_detected: boolean;
  show_warning_for_new_assets_detected: boolean;
  hide_trades_until: string | null;
  prevent_trades_in_non_tradable_accounts: boolean;
};

export type Error = {
  code: string;
  meta?: {
    symbols: any[];
  };
};

export type AssetClass = {
  id: string;
  name: string;
  percent: number;
  exclude_asset_class: boolean;
};

export type AssetClassSymbol = {
  symbol: string;
  accounts: string[];
};

export type AssetClassesDetails = {
  asset_class: AssetClass;
  symbols: AssetClassSymbol[];
  asset_class_in_targets: boolean;
};

export type GroupInfoData = {
  asset_classes_details: AssetClassesDetails[];
  asset_class_trade_priorities: AssetClassPriorities[];
  accounts: Account[];
  brokerage_authorizations: Authorization[];
  symbols: Symbol[];
  quotable_symbols: Symbol[];
  balances: Balance[];
  positions: Position[];
  calculated_trades: CalculatedTrades;
  accuracy: number;
  settings: Settings;
  model_portfolio: ModelPortfolio;
  error: Error;
  forex_rates: ForexRate[];
};
