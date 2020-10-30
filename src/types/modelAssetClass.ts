import { Symbol } from './groupInfo';

export type ModelAssetClassDetailsType = {
  model_asset_class: ModelAssetClass;
  model_asset_class_target: Symbolic[];
};

export type ModelAssetClass = {
  id: string;
  name: string;
};

export type Symbolic = {
  symbol: Symbol;
};
