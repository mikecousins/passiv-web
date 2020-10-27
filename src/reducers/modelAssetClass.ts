const initialState = {
  listOfAssetClasses: [],
};

const modelAssetClasses = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_ASSET_CLASSES':
      return {
        ...state,
        listOfAssetClasses: action.data,
      };
    case 'ADD_ASSET_CLASS':
      const assetClassCpy = JSON.parse(
        JSON.stringify(state.listOfAssetClasses),
      );
      assetClassCpy.push(action.data);
      return {
        ...state,
        listOfAssetClasses: assetClassCpy,
      };
    case 'UPDATE_ASSET_CLASS':
      const assetClassCopy = JSON.parse(
        JSON.stringify(state.listOfAssetClasses),
      );
      //? Not sure if 'any' is a right type
      assetClassCopy.map((astClass: any) => {
        if (
          astClass.model_asset_class.id === action.data.model_asset_class.id
        ) {
          astClass = action.data;
        }
      });
      return {
        ...state,
        listOfAssetClasses: assetClassCopy,
      };
    case 'DELETE_ASSET_CLASS':
      const updatedList = state.listOfAssetClasses.filter((astClass: any) => {
        return astClass.model_asset_class.id !== action.id;
      });
      return {
        ...state,
        listOfAssetClasses: updatedList,
      };
    default:
      break;
  }
  return state;
};

export default modelAssetClasses;
