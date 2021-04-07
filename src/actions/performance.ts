import { getData, postData } from '../api';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const loadPerformanceAll: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = (accountNumbers) => {
  return (dispatch) => {
    dispatch(fetchPerformanceAllStart());
    postData('/api/v1/performance/all/', { accountNumbers })
      .then((response) => {
        dispatch(fetchPerformanceAllSuccess(response));
      })
      .catch((error) => dispatch(fetchPerformanceAllError(error)));
  };
};

export const loadPerformanceCustom: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = (accountNumbers, startDate, endDate) => {
  return (dispatch) => {
    dispatch(fetchPerformanceCustomStart());
    postData('/api/v1/performance/custom/', {
      accountNumbers,
      startDate,
      endDate,
    })
      .then((response) => {
        dispatch(fetchPerformanceCustomSuccess(response));
      })
      .catch((error) => dispatch(fetchPerformanceCustomError(error)));
  };
};

export const loadReportingSettings: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = () => {
  return (dispatch) => {
    dispatch(fetchReportingSettingsStart());
    getData('/api/v1/performance/settings/')
      .then((response) => {
        dispatch(fetchReportingSettingsSuccess(response));
      })
      .catch((error) => dispatch(fetchReportingSettingsError(error)));
  };
};

export const updateReportingSettings: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = (settings) => {
  return (dispatch) => {
    dispatch(updateReportingSettingsStart());
    postData('/api/v1/performance/settings/', settings)
      .then((response) => {
        dispatch(fetchReportingSettingsSuccess(response));
        dispatch(updateReportingSettingsSuccess(response));
      })
      .catch((error) => dispatch(updateReportingSettingsError(error)));
  };
};

export const fetchPerformanceAllStart: ActionCreator<Action> = () => ({
  type: 'FETCH_PERFORMANCE_ALL_START',
});

export const fetchPerformanceAllSuccess: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_PERFORMANCE_ALL_SUCCESS',
  payload,
});

export const fetchPerformanceAllError: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_PERFORMANCE_ALL_ERROR',
  payload,
});

export const fetchPerformanceCustomStart: ActionCreator<Action> = () => ({
  type: 'FETCH_PERFORMANCE_CUSTOM_START',
});

export const fetchPerformanceCustomSuccess: ActionCreator<Action> = (
  payload,
) => ({
  type: 'FETCH_PERFORMANCE_CUSTOM_SUCCESS',
  payload,
});

export const fetchPerformanceCustomError: ActionCreator<Action> = (
  payload,
) => ({
  type: 'FETCH_PERFORMANCE_CUSTOM_ERROR',
  payload,
});

export const fetchReportingSettingsStart: ActionCreator<Action> = () => ({
  type: 'FETCH_REPORTING_SETTINGS_START',
});

export const fetchReportingSettingsSuccess: ActionCreator<Action> = (
  payload,
) => ({
  type: 'FETCH_REPORTING_SETTINGS_SUCCESS',
  payload,
});

export const fetchReportingSettingsError: ActionCreator<Action> = (
  payload,
) => ({
  type: 'FETCH_REPORTING_SETTINGS_ERROR',
  payload,
});

export const updateReportingSettingsStart: ActionCreator<Action> = () => ({
  type: 'UPDATE_REPORTING_SETTINGS_START',
});

export const updateReportingSettingsSuccess: ActionCreator<Action> = (
  payload,
) => ({
  type: 'UPDATE_REPORTING_SETTINGS_SUCCESS',
  payload,
});

export const updateReportingSettingsError: ActionCreator<Action> = (
  payload,
) => ({
  type: 'UPDATE_REPORTING_SETTINGS_ERROR',
  payload,
});

export const setSelectedTimeframe: ActionCreator<Action> = (timeframe) => ({
  type: 'SET_SELECTED_TIMEFRAME',
  timeframe,
});

export const setSelectedAccounts: ActionCreator<Action> = (accounts) => ({
  type: 'SET_SELECTED_ACCOUNTS',
  accounts,
});

export const setStartDate: ActionCreator<Action> = (startDate) => ({
  type: 'SET_REPORTING_START_DATE',
  startDate,
});

export const setEndDate: ActionCreator<Action> = (endDate) => ({
  type: 'SET_REPORTING_END_DATE',
  endDate,
});

export const loadAdjustedCostBasis: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = () => {
  return (dispatch) => {
    dispatch(fetchACBStart());
    getData('/api/v1/performance/adjustedCostBasis/')
      .then((response) => {
        dispatch(fetchACBSuccess(response));
      })
      .catch((error) => dispatch(fetchACBError(error)));
  };
};

export const fetchACBStart: ActionCreator<Action> = () => ({
  type: 'FETCH_ACB_START',
});

export const fetchACBSuccess: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_ACB_SUCCESS',
  payload,
});

export const fetchACBError: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_ACB_ERROR',
  payload,
});
