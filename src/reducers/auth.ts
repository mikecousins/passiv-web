import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type AuthState = {
  token: string | null;
  error: object | null;
  device: {
    token: string | null;
    expiry: string | null;
  };
};

const initialState: AuthState = {
  token: null,
  error: null,
  device: {
    token: null,
    expiry: null,
  },
};

type AuthAction = {
  type: 'LOGIN_SUCCEEDED' | 'LOGIN_FAILED' | 'LOGOUT' | 'TOKEN_EXPIRED';
  payload: {
    data: {
      token: string;
      device: {
        token: string;
        expiry: string;
      };
    };
  };
};
//@ts-ignore
const auth: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action: AuthAction,
) => {
  if (action.type === 'LOGIN_SUCCEEDED') {
    if (action.payload.data.device) {
      state.device = {
        token: action.payload.data.device.token,
        expiry: action.payload.data.device.expiry,
      };
    }
    return {
      ...state,
      token: action.payload.data.token,
      error: null,
    };
  }

  if (action.type === 'LOGIN_FAILED') {
    return {
      ...state,
      token: null,
      error: action.payload,
    };
  }

  if (action.type === 'LOGOUT') {
    return {
      ...state,
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

const persistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['token', 'error'],
};

export default persistReducer(persistConfig, auth);
