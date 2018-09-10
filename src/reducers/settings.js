const settings = (state = [], action) => {
  if (action.type === 'SETTINGS_SUCCEEDED') {
    return {
      settings: action.payload,
    };
  } else if (action.type === 'SETTINGS_FAILED') {
    return {
      settings: null,
    };
  }
  return state;
};

export default settings;
