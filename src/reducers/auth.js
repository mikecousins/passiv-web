const auth = (state = {}, action) => {
  if (action.type === 'LOGIN_SUCCEEDED') {
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
    return {
      token: null,
      error: null,
    };
  }
  return state;
};

export default auth;
