import { ActionCreator } from 'redux';

export const toggleDemoMode = (): ActionCreator<void> => async dispatch => {
  dispatch({ type: 'TOGGLE_DEMO_MODE' });
};
