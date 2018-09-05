const Login = (state = [], action) => {
  if (action.type === 'LOGIN_STARTED') {
    return [
      ...state,
      {
        loggedIn: false,
        loggingIn: true,
      }
    ];
  }
  else if (action.type === 'LOGIN_SUCCEEDED') {
    return [
      ...state,
      {
        loggedIn: true,
        loggingIn: false,
      }
    ];
  } else if (action.type === 'LOGIN_FAILED') {
    return [
      ...state,
      {
        loggedIn: false,
        loggingIn: false,
      }
    ];
  }
  return state;
};

export default Login;
