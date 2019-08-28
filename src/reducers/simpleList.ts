import { SimpleState } from '../types/common';

interface SimpleListProps {
  baseType: string;
  userData: boolean;
}

export interface SimpleListState<T> {
  [key: string]: SimpleState<T>;
}

const simpleList = <T extends object>({
  baseType,
  userData,
}: SimpleListProps) => {
  const START = `${baseType}_START`;
  const SUCCESS = `${baseType}_SUCCESS`;
  const ERROR = `${baseType}_ERROR`;

  const initialData: SimpleListState<T> = {};

  // here we're returning our customized reducer
  return (state = initialData, action: any) => {
    if (action.type === START) {
      const newState: SimpleListState<T> = JSON.parse(JSON.stringify(state));
      if (!newState[action.id]) {
        newState[action.id] = {
          data: null,
          lastError: null,
          error: null,
          lastFetch: null,
          loading: true,
          stale: false,
          permanentFail: false,
        };
      } else {
        newState[action.id].loading = true;
      }
      return newState;
    }

    if (action.type === SUCCESS) {
      // if successful we store our data
      // store the lastFetch timestamp
      // clear out any errors
      // and set loading to false
      return {
        ...state,
        [action.id]: {
          data: action.payload.data,
          lastFetch: Date.now(),
          error: null,
          lastError: null,
          loading: false,
        },
      };
    }

    if (action.type === ERROR) {
      // we still want to leave existing
      // data intact as well as "last fetch"
      // which would let us determine if the
      // data is stale or not
      return {
        ...state,
        [action.id]: {
          lastError: Date.now(),
          error: action.error,
          loading: false,
        },
      };
    }

    if (action.type === 'LOGOUT' && userData) {
      return initialData;
    }

    if (!state) {
      return initialData;
    }
    return state;
  };
};

export default simpleList;
