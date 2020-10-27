import { getData, postData, deleteData } from '../api';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';

export const fetchAssetClassesSuccess: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_ASSET_CLASSES',
  data: payload.data,
});

export const addAssetClassSuccess: ActionCreator<Action> = (payload) => ({
  type: 'ADD_ASSET_CLASS',
  data: payload.data,
});
export const updateAssetClassSuccess: ActionCreator<Action> = (payload) => ({
  type: 'UPDATE_ASSET_CLASS',
  data: payload.data,
});

export const deleteAssetClassSuccess: ActionCreator<Action> = (id) => ({
  type: 'DELETE_ASSET_CLASS',
  id,
});

export const fetchAssetClasses: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = () => {
  return (dispatch) => {
    getData('/api/v1/modelAssetClass/')
      .then((response) => {
        dispatch(fetchAssetClassesSuccess(response));
      })
      .catch((error) => {
        // dispatch(fetchAccountsError(error))
        console.log(error);
      }); //!! Add needed error handler
  };
};

export const addAssetClass: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = () => {
  return (dispatch) => {
    postData('/api/v1/modelAssetClass/', {})
      .then((response) => {
        dispatch(addAssetClassSuccess(response));
      })
      .catch((error) => {
        // dispatch(fetchAccountsError(error))
        console.log(error);
      }); //!! Add needed error handler
  };
};

export const updateAssetClass: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = (assetClass) => {
  return (dispatch) => {
    postData(
      `/api/v1/modelAssetClass/${assetClass.model_asset_class.id}`,
      assetClass,
    )
      .then((response) => {
        dispatch(updateAssetClassSuccess(response));
        toast.success(
          `${assetClass.model_asset_class.name} Asset Class Updated Successfully`,
          { autoClose: 3000 },
        );
      })
      .catch((error) => {
        dispatch(fetchAssetClasses());
        toast.error(
          `${assetClass.model_asset_class.name} Asset Class Update Failed`,
          { autoClose: 3000 },
        );
      });
  };
};

export const deleteAssetClass: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = ({ id }) => {
  return (dispatch) => {
    deleteData(`/api/v1/modelAssetClass/${id}`)
      .then(() => {
        dispatch(deleteAssetClassSuccess(id));
        toast.success('Asset Class Deleted Successfully', { autoClose: 3000 });
      })
      .catch((error) => {
        toast.error('Asset Class Deletion was Unsuccessful', {
          autoClose: 3000,
        });
      }); //!! Add needed error handler
  };
};
