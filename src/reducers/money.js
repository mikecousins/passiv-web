const money = (state = [], action) => {
  if (action.type === 'PORTFOLIO_GROUPS_SUCCEEDED') {
    return {
      portfolioGroups: action.payload,
    };
  } else if (action.type === 'PORTFOLIO_GROUPS_FAILED') {
    return {
      portfolioGroups: [],
    };
  }
  return state;
};

export default money;
