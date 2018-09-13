const symbols = (state = {}, action) => {
  if (action.type === 'GET_SYMBOLS_SUCCEEDED') {
    return action.payload;
  } else if (action.type === 'GET_SYMBOLS_FAILED') {
    return null;
  }
  return state;
};

export default symbols;
