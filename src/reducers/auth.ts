const initialState: {
  token: string | null;
  error: object | null;
} = {
  token: null,
  error: null,
};

const auth = (state = initialState, action: any) => {
  if (action.type === 'LOGIN_SUCCEEDED') {
    return {
      token: action.payload.data.token,
      error: null,
    };
  }

  if (action.type === 'LOGIN_FAILED') {
    return {
      token: null,
      error: action.payload,
    };
  }

  if (action.type === 'LOGOUT') {
    return {
      token: null,
      error: null,
    };
  }

  if (action.type === 'TOKEN_EXPIRED') {
    return {
      ...state,
      token: null,
    };
  }
  return state;
};

export default auth;
