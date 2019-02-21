const auth = (state = {}, action) => {
  if (action.type === 'LOGIN_SUCCEEDED') {
    localStorage.setItem('jwt', action.payload.token);
    return {
      token: action.payload.token,
      error: null,
    };
  } else if (action.type === 'LOGIN_FAILED') {
    return {
      token: null,
      error: action.payload,
    };
  } else if (action.type === 'LOGOUT') {
    localStorage.removeItem('jwt');
    return {
      token: null,
      error: null,
    };
  }
  return state;
};

export default auth;
