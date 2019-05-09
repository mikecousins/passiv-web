import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const toggleDemoMode = (): ThunkAction<
  void,
  object,
  null,
  Action
> => async dispatch => {
  dispatch({ type: 'TOGGLE_DEMO_MODE' });
};
