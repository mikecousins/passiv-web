const initialState = {
  listOfAssetClasses: [],
};

const modelAssetClasses = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_ASSET_CLASSES':
      console.log('fetched asset classes', action.data);
      return {
        ...state,
        listOfAssetClasses: action.data,
      };
    case 'UPDATE_ASSET_CLASS_NAME':
      const updatedAssetClass = JSON.parse(
        JSON.stringify(state.listOfAssetClasses),
      );
      //? Not sure if 'any' is a right type
      updatedAssetClass.map((astClass: any) => {
        if (
          astClass.model_asset_class.id === action.data.model_asset_class.id
        ) {
          astClass.model_asset_class.name = action.data.model_asset_class.name;
        }
      });
      return {
        ...state,
        listOfAssetClasses: updatedAssetClass,
      };
    case 'ADD_ASSET_CLASS':
      return {
        ...state,
      };
    case 'DELETE_ASSET_CLASS':
      const updatedList = state.listOfAssetClasses.filter((astClass: any) => {
        return astClass.model_asset_class.id !== action.id;
      });
      return {
        ...state,
        listOfAssetClasses: updatedList,
      };
    case 'ADD_SECURITY':
      return {
        ...state,
      };
    case 'DELETE_SECURITY':
      return {
        ...state,
      };
    default:
      break;
  }
  return state;
};

export default modelAssetClasses;
