import { SimpleState } from '../types/common';

interface Props {
  baseType: string;
  userData: boolean;
}

const simple = <T extends object>({ baseType, userData }: Props) => {
  const START = `${baseType}_START`;
  const SUCCESS = `${baseType}_SUCCESS`;
  const ERROR = `${baseType}_ERROR`;

  const initialData: SimpleState<T> = {
    data: null,
    lastError: null,
    error: null,
    lastFetch: null,
    loading: false,
    stale: false,
    permanentFail: false,
  };

  return (state = initialData, action: any) => {
    if (action.type === START) {
      const newState: SimpleState<T> = {
        ...state,
        loading: true,
      };
      return newState;
    }

    if (action.type === SUCCESS) {
      const newState: SimpleState<T> = {
        ...state,
        data: action.payload.data,
        lastFetch: Date.now(),
        error: null,
        lastError: null,
        loading: false,
      };
      return newState;
    }

    if (action.type === ERROR) {
      const newState: SimpleState<T> = {
        ...state,
        lastError: Date.now(),
        error: action.error,
        loading: false,
      };
      return newState;
    }

    // if we're logging out and we're storing user data, clear it all out
    if (action.type === 'LOGOUT' && userData) {
      return initialData;
    }

    if (!state) {
      return initialData;
    }
    return state;
  };
};

export default simple;
