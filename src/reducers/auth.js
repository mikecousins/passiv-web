const auth = (state = {}, action) => {
  if (action.type === 'LOGIN_SUCCEEDED') {
    return {
      token: action.payload.token,
    };
  } else if (action.type === 'LOGIN_FAILED') {
    return {
      token: null,
    };
  } else if (action.type === 'LOGOUT') {
    return {
      token: null,
    };
  }
  return state;
};

export default auth;
