import { Symbol } from './groupInfo';

export type ModelAssetClass = {
  model_asset_class: {
    id: string;
    name: string;
  };
  model_asset_class_target: Symbol[];
};
