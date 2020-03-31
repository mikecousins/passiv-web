const selectedTimeframe = (state = '1Y', action: any) => {
  if (action.type === 'SET_SELECTED_TIMEFRAME') {
    return action.timeframe;
  } else {
    return state;
  }
};

export default selectedTimeframe;
