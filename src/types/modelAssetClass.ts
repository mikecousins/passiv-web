import { Symbol } from './groupInfo';

export type ModelAssetClassDetailsType = {
  model_asset_class: ModelAssetClass;
  model_asset_class_target: Target[];
};

export type ModelAssetClass = {
  id: string;
  name?: string;
};

export type Target = {
  symbol: Symbol;
};
