export const loginStarted = () => ({
  type: 'LOGIN_STARTED',
});

export const loginSucceeded = payload => ({
  type: 'LOGIN_SUCCEEDED',
  payload,
});

export const loginFailed = () => ({
  type: 'LOGIN_FAILED',
});
