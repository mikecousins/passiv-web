const auth = (state = [], action) => {
  if (action.type === 'LOGIN_SUCCEEDED') {
    return {
      loggedIn: true,
    };
  } else if (action.type === 'LOGIN_FAILED') {
    return {
      loggedIn: false,
    };
  } else if (action.type === 'LOGOUT') {
    return {
      loggedIn: false,
    };
  }
  return state;
};

export default auth;
