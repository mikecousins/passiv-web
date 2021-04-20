import { Currency } from './currency';
import { ModelAssetClass } from './modelAssetClass';

export type ModelPortfolioDetailsType = {
  model_portfolio: ModelPortfolio;
  model_portfolio_asset_class: ModelAssetClassWithPercentage[];
  model_portfolio_security: TargetWithPercentage[];
};

export type ModelPortfolio = {
  id?: string;
  name: string;
  model_type: number;
  share_portfolio: boolean;
  total_assigned_portfolio_groups: number;
};

type Symbol = {
  id: string;
  symbol?: string;
  description?: string;
  security_type?: string;
  currency?: Currency;
};

export type TargetWithPercentage = {
  symbol: Symbol;
  percent: string;
};

export type ModelAssetClassWithPercentage = {
  model_asset_class: ModelAssetClass;
  percent: string;
};

export type TradePriority = {
  symbol_id: string;
  allow_buy: boolean;
  allow_sell: boolean;
  sell_priority: number;
  unsupported_symbols: any; //TODO: use an actual type
};

export type AccountPriorities = {
  account_id?: string;
  account: {
    id: string;
    number: string;
    name: string;
  };
  unsupported_symbols: string[];
  sell_priority: string[];
  buy_priority: string[];
  unassigned: string[];
  do_not_trade: string[];
};

export type AssetClassPriorities = {
  asset_class: {
    id: string;
    name: string;
    percent: string;
    exclude_asset_class: boolean;
  };
  accounts_priorities: AccountPriorities[];
};
