import { SimpleState } from '../types/common';

interface SimpleListProps {
  baseType: string;
  userData: boolean;
}

const simpleList = <T extends object>({
  baseType,
  userData,
}: SimpleListProps) => {
  const START = `${baseType}_START`;
  const SUCCESS = `${baseType}_SUCCESS`;
  const ERROR = `${baseType}_ERROR`;

  interface SimpleListState {
    [key: string]: SimpleState<T>;
  }

  const initialData: SimpleListState = {};

  // here we're returning our customized reducer
  return (state = initialData, action: any) => {
    if (action.type === START) {
      return Object.assign({}, state, {
        [action.id]: {
          loading: true,
        },
      });
    }
    if (action.type === SUCCESS) {
      // if successful we store our data
      // store the lastFetch timestamp
      // clear out any errors
      // and set loading to false
      return Object.assign({}, state, {
        [action.id]: {
          data: action.payload.data,
          lastFetch: Date.now(),
          error: null,
          lastError: null,
          loading: false,
        },
      });
    }
    if (action.type === ERROR) {
      // we still want to leave existing
      // data intact as well as "last fetch"
      // which would let us determine if the
      // data is stale or not
      return Object.assign({}, state, {
        [action.id]: {
          lastError: Date.now(),
          error: action.error,
          loading: false,
        },
      });
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
