const initialState = {
  trackingId: '',
};

const tracking = (state = initialState, action: any) => {
  if (action.type === 'SET_TRACKING_ID') {
    return { trackingId: action.payload.trackingId };
  }
  return state;
};

export default tracking;
