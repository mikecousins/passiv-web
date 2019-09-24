import { Reducer } from 'redux';

export type AuthState = {
  token: string | null;
  error: object | null;
};

const initialState: AuthState = {
  token: null,
  error: null,
};

type AuthAction = {
  type: 'LOGIN_SUCCEEDED' | 'LOGIN_FAILED' | 'LOGOUT' | 'TOKEN_EXPIRED';
  payload: {
    data: {
      token: string;
    };
  };
};

const auth: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action: AuthAction,
) => {
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
    localStorage.clear();
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
