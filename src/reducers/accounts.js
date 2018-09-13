const accounts = (state = {}, action) => {
  if (action.type === 'GET_ACCOUNTS_SUCCEEDED') {
    return action.payload;
  } else if (action.type === 'GET_ACCOUNTS_FAILED') {
    return null;
  }
  return state;
};

export default accounts;
