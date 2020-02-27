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
    getData('/api/v1/performance/all/')
      .then(response => {
        dispatch(fetchPerformanceAllSuccess(response));
      })
      .catch(error => dispatch(fetchPerformanceAllError(error)));
  };
};

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

// Old actions from before switched to only make one performance api call for all data
// export const loadTotalEquityTimeframe: ActionCreator<ThunkAction<
//   void,
//   any,
//   any,
//   Action<any>
// >> = timeframe => {
//   return dispatch => {
//     getData('/api/v1/performance/balanceTimeframe/' + timeframe + '/')
//       .then(response => {
//         if (timeframe === '1Y') {
//           dispatch(fetchTotalEquityTimeframe1YSuccess(response, timeframe));
//         } else if (timeframe === 'YTD') {
//           dispatch(fetchTotalEquityTimeframeYTDSuccess(response, timeframe));
//         } else if (timeframe === '30D') {
//           dispatch(fetchTotalEquityTimeframe30DSuccess(response, timeframe));
//         }
//       })
//       .catch(error =>
//         dispatch(fetchTotalEquityTimeframeError(error, timeframe)),
//       );
//   };
// };
//
// export const fetchTotalEquityTimeframe1YSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_TOTAL_EQUITY_TIMEFRAME_1Y_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchTotalEquityTimeframeYTDSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_TOTAL_EQUITY_TIMEFRAME_YTD_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchTotalEquityTimeframe30DSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_TOTAL_EQUITY_TIMEFRAME_30D_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchTotalEquityTimeframeError: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_TOTAL_EQUITY_TIMEFRAME_ERROR',
//   payload,
//   timeframe,
// });
//
// export const loadContributionTimeframe: ActionCreator<ThunkAction<
//   void,
//   any,
//   any,
//   Action<any>
// >> = timeframe => {
//   return dispatch => {
//     getData('/api/v1/performance/contributionTimeframe/' + timeframe + '/')
//       .then(response => {
//         if (timeframe === '1Y') {
//           dispatch(fetchContributionTimeframe1YSuccess(response, timeframe));
//         } else if (timeframe === 'YTD') {
//           dispatch(fetchContributionTimeframeYTDSuccess(response, timeframe));
//         } else if (timeframe === '30D') {
//           dispatch(fetchContributionTimeframe30DSuccess(response, timeframe));
//         }
//       })
//       .catch(error =>
//         dispatch(fetchContributionTimeframeError(error, timeframe)),
//       );
//   };
// };
//
// export const fetchContributionTimeframe1YSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTION_TIMEFRAME_1Y_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchContributionTimeframeYTDSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTION_TIMEFRAME_YTD_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchContributionTimeframe30DSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTION_TIMEFRAME_30D_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchContributionTimeframeError: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTION_TIMEFRAME_ERROR',
//   payload,
//   timeframe,
// });
//
// export const loadContributions: ActionCreator<ThunkAction<
//   void,
//   any,
//   any,
//   Action<any>
// >> = timeframe => {
//   return dispatch => {
//     getData('/api/v1/performance/contributions/' + timeframe + '/')
//       .then(response => {
//         if (timeframe === '1Y') {
//           dispatch(fetchContributions1YSuccess(response, timeframe));
//         } else if (timeframe === 'YTD') {
//           dispatch(fetchContributionsYTDSuccess(response, timeframe));
//         } else if (timeframe === '30D') {
//           dispatch(fetchContributions30DSuccess(response, timeframe));
//         }
//       })
//       .catch(error => dispatch(fetchContributionsError(error, timeframe)));
//   };
// };
//
// export const fetchContributions1YSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTIONS_1Y_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchContributionsYTDSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTIONS_YTD_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchContributions30DSuccess: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTIONS_30D_SUCCESS',
//   payload,
//   timeframe,
// });
//
// export const fetchContributionsError: ActionCreator<Action> = (
//   payload,
//   timeframe,
// ) => ({
//   type: 'FETCH_CONTRIBUTIONS_ERROR',
//   payload,
//   timeframe,
// });
