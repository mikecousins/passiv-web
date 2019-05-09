import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getData } from '../api';

export const checkIfOnline = (): ThunkAction<
  void,
  object,
  null,
  Action
> => async dispatch => {
  dispatch(checkingIfOnline());
  getData('/api/v1')
    .then(() => dispatch(setOnline()))
    .catch(() => dispatch(setOffline()));
};

export const checkingIfOnline = () => ({
  type: 'CHECKING_IF_ONLINE',
});

export const setOnline = () => ({
  type: 'SET_ONLINE',
});

export const setOffline = () => ({
  type: 'SET_OFFLINE',
});
