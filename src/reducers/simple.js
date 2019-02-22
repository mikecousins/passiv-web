export default ({ baseType, userData }) => {
  const START = `${baseType}_START`
  const SUCCESS = `${baseType}_SUCCESS`
  const ERROR = `${baseType}_ERROR`

  const initialData = {
    data: null,
    lastError: null,
    error: null,
    lastFetch: null,
    loading: false,
  };

  // here we're returning our customized reducer
  return (state, action) => {
    if (action.type === START) {
      return Object.assign({}, state, {
        loading: true
      })
    }

    if (action.type === SUCCESS) {
      // if successful we store our data
      // store the lastFetch timestamp
      // clear out any errors
      // and set loading to false
      return Object.assign({}, state, {
        data: action.payload.data,
        lastFetch: Date.now(),
        error: null,
        lastError: null,
        loading: false
      })
    }

    if (action.type === ERROR) {
      // we still want to leave existing
      // data intact as well as "last fetch"
      // which would let us determine if the
      // data is stale or not
      return Object.assign({}, state, {
        lastError: Date.now(),
        error: action.error,
        loading: false
      })
    }
    // if we're logging out and we're storing user data, clear it all out
    if (action.type === 'LOGOUT' && userData) {
      return initialData;
    }

    if (!state) {
      return initialData;
    };
    return state;
  }
}
