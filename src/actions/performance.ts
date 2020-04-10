import { getData } from '../api';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const loadPerformanceAll: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = () => {
  return dispatch => {
    dispatch(fetchPerformanceAllStart());
    getData('/api/v1/performance/all/')
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
