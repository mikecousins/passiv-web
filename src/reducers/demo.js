const demo = (state = false, action) => {
  if (action.type === 'TOGGLE_DEMO_MODE') {
    return !state;
  }
  return state;
};

export default demo;
