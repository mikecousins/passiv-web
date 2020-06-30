const initialState = {
  version: 0,
};

const version = (state = initialState, action: any) => {
  if (action.type === 'SET_VERSION') {
    const newVersion = action.payload.version;
    if (state.version > 0 && state.version !== newVersion) {
      // outdated version, force app reload
      window.location.reload();
    }
    return { ...state, version: newVersion };
  }
  return state;
};

export default version;
