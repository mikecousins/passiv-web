const initialState = {
  isOnline: true,
  lastChecked: 0,
  checking: false,
};

const online = (state = initialState, action: any) => {
  if (action.type === 'CHECKING_IF_ONLINE') {
    return { ...state, checking: true };
  }
  if (action.type === 'SET_ONLINE') {
    return { isOnline: true, lastChecked: Date.now(), checking: false };
  }
  if (action.type === 'SET_OFFLINE') {
    return { isOnline: false, lastChecked: Date.now(), checking: false };
  }
  return state;
};

export default online;
