const brokerages = (state = {}, action) => {
  if (action.type === 'GET_BROKERAGES_SUCCEEDED') {
    return {
      brokerages: action.payload,
    };
  } else if (action.type === 'GET_BROKERAGES_FAILED') {
    return {
      brokerages: null,
    };
  }
  return state;
};

export default brokerages;
