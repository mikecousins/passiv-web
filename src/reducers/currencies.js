const currencies = (state = {}, action) => {
  if (action.type === 'GET_CURRENCIES_SUCCEEDED') {
    return action.payload;
  } else if (action.type === 'GET_CURRENCIES_FAILED') {
    return null;
  }
  return state;
};

export default currencies;
