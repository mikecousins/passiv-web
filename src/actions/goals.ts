import { deleteData, getData } from '../api';
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

export const deleteGoal: ActionCreator<ThunkAction<
  void,
  any,
  any,
  Action<any>
>> = (id: string) => {
  return (dispatch) => {
    deleteData('/api/v1/goal/' + id).then(() => dispatch(loadGoals()));
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
