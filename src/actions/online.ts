import { getData } from '../api';

export const checkIfOnline = () => {
  return (dispatch: any) => {
    getData('/api/v1')
      .then(() => dispatch(setOnline()))
      .catch(() => dispatch(setOffline()));
  };
};

export const setOnline = () => ({
  type: 'SET_ONLINE',
});

export const setOffline = () => ({
  type: 'SET_OFFLINE',
});
