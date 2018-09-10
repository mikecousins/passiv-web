// import Api from '../api';

export const loginStartedAsync = payload => {
  return dispatch => {
    setTimeout(() => {
      dispatch(loginSucceeded());
    }, 1000);
    /*
    Api.postData('', { email: payload.email, password: payload.password })
      .then(response => dispatch(loginSucceeded(response)))
      .catch(error => dispatch(loginFailed(error)));
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

export const logoutStartedAsync = () => {
  return dispatch => {
    dispatch(logout);
  }
}

export const logout = () => ({
  type: 'LOGOUT',
});
