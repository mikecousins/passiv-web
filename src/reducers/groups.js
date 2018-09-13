const groups = (state = {}, action) => {
  if (action.type === 'GET_GROUPS_SUCCEEDED') {
    return action.payload;
  } else if (action.type === 'GET_GROUPS_FAILED') {
    return null;
  }
  return state;
};

export default groups;
