import { deleteData, getData, postData } from '../api';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const loadGoals: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = () => {
  return (dispatch) => {
    dispatch(fetchGoalsStart());
    getData('/api/v1/goals/')
      .then((response) => {
        dispatch(fetchGoalsSuccess(response));
      })
      .catch((error) => dispatch(fetchGoalsError(error)));
  };
};

export const fetchGoalsStart: ActionCreator<Action> = () => ({
  type: 'FETCH_GOALS_START',
});

export const fetchGoalsSuccess: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_GOALS_SUCCESS',
  payload,
});

export const fetchGoalsError: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_GOALS_ERROR',
  payload,
});

export const deleteGoal: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = (id: string) => {
  return (dispatch) => {
    dispatch(fetchDeleteGoalStart());
    if (id !== '') {
      deleteData('/api/v1/goal/' + id)
        .then(() => {
          dispatch(loadGoals());
          dispatch(fetchDeleteGoalSuccess);
        })
        .catch((error) => dispatch(fetchDeleteGoalError(error)));
    }
  };
};

export const fetchDeleteGoalStart: ActionCreator<Action> = () => ({
  type: 'FETCH_DELETE_GOAL_START',
});

export const fetchDeleteGoalSuccess: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_DELETE_GOAL_SUCCESS',
  payload,
});

export const fetchDeleteGoalError: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_DELETE_GOAL_ERROR',
  payload,
});

export const createGoal: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = (goalData, history) => {
  return (dispatch) => {
    dispatch(fetchCreateGoalStart());
    postData('/api/v1/goals/', goalData)
      .then((response: any) => {
        dispatch(loadGoals());
        dispatch(fetchCreateGoalSuccess());
        return response;
      })
      .then((response) =>
        history.push({
          pathname: '/app/goal/' + response.data.id,
          state: { goal: response.data },
        }),
      )
      .catch((error) => dispatch(fetchCreateGoalError(error)));
  };
};

export const fetchCreateGoalStart: ActionCreator<Action> = () => ({
  type: 'FETCH_CREATE_GOAL_START',
});

export const fetchCreateGoalSuccess: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_CREATE_GOAL_SUCCESS',
  payload,
});

export const fetchCreateGoalError: ActionCreator<Action> = (payload) => ({
  type: 'FETCH_CREATE_GOAL_ERROR',
  payload,
});
