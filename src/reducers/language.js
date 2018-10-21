const demo = (state = 'en-CA', action) => {
  if (action.type === 'CHANGE_LANGUAGE') {
    return action.payload;
  }
  return state;
};

export default demo;
