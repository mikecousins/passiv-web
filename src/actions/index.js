export const loginStarted = () => ({
  type: 'LOGIN_STARTED',
});

export const loginStartedAsync = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(loginSucceeded());
    }, 1000); 
  };
};

export const loginSucceeded = payload => ({
  type: 'LOGIN_SUCCEEDED',
  payload,
});

export const loginFailed = () => ({
  type: 'LOGIN_FAILED',
});
