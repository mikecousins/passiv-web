import { Currency } from './currency';
import { ModelAssetClass } from './modelAssetClass';

export type ModelPortfolioDetailsType = {
  model_portfolio: ModelPortfolio;
  model_portfolio_asset_class: ModelAssetClassWithPercentage[];
  model_portfolio_security: TargetWithPercentage[];
  total_assigned_portfolio_groups: number;
};

export type ModelPortfolio = {
  id?: string;
  name: string;
  model_type: number;
  share_portfolio: boolean;
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
