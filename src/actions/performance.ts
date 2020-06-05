import { getData, postData } from '../api';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const loadPerformanceAll: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = accountNumbers => {
  return dispatch => {
    dispatch(fetchPerformanceAllStart());
    postData('/api/v1/performance/all/', accountNumbers)
      .then(response => {
        dispatch(fetchPerformanceAllSuccess(response));
      })
      .catch(error => dispatch(fetchPerformanceAllError(error)));
  };
};

export const fetchPerformanceAllStart: ActionCreator<Action> = () => ({
  type: 'FETCH_PERFORMANCE_ALL_START',
});

export const fetchPerformanceAllSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_PERFORMANCE_ALL_SUCCESS',
  payload,
});

export const fetchPerformanceAllError: ActionCreator<Action> = payload => ({
  type: 'FETCH_PERFORMANCE_ALL_ERROR',
  payload,
});

export const setSelectedTimeframe: ActionCreator<Action> = timeframe => ({
  type: 'SET_SELECTED_TIMEFRAME',
  timeframe,
});

export const setSelectedAccounts: ActionCreator<Action> = accounts => ({
  type: 'SET_SELECTED_ACCOUNTS',
  accounts,
});

export const loadAdjustedCostBasis: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = () => {
  return dispatch => {
    dispatch(fetchACBStart());
    getData('/api/v1/performance/adjustedCostBasis/')
      .then(response => {
        dispatch(fetchACBSuccess(response));
      })
      .catch(error => dispatch(fetchACBError(error)));
  };
};

export const fetchACBStart: ActionCreator<Action> = () => ({
  type: 'FETCH_ACB_START',
});

export const fetchACBSuccess: ActionCreator<Action> = payload => ({
  type: 'FETCH_ACB_SUCCESS',
  payload,
});

export const fetchACBError: ActionCreator<Action> = payload => ({
  type: 'FETCH_ACB_ERROR',
  payload,
});
