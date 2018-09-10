export const loginStartedAsync = payload => {
  return dispatch => {
    setTimeout(() => {
      dispatch(loginSucceeded());
    }, 1000);
    /*
    fetch('')
      .then(response => dispatch(loginSucceeded()))
      .catch(() => dispatch(loginFailed()));
    */
  };
};

export const loginSucceeded = payload => ({
  type: 'LOGIN_SUCCEEDED',
  payload,
});

export const loginFailed = () => ({
  type: 'LOGIN_FAILED',
});
