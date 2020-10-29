import { Symbol } from './groupInfo';

export type ModelAssetClassDetails = {
  model_asset_class: ModelAssetClass;
  model_asset_class_target: Symbol[];
};

export type ModelAssetClass = {
  id: string;
  name: string;
};
