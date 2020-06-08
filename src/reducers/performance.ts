export const selectedTimeframe = (state = '1Y', action: any) => {
  if (action.type === 'SET_SELECTED_TIMEFRAME') {
    return action.timeframe;
  } else {
    return state;
  }
};

export const selectedAccounts = (state = [], action: any) => {
  if (action.type === 'SET_SELECTED_ACCOUNTS') {
    return action.accounts;
  } else {
    return state;
  }
};
