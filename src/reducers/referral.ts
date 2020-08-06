const initialState = {
  referralCode: '',
};

const referral = (state = initialState, action: any) => {
  if (action.type === 'SET_REFERRAL_CODE') {
    return { referralCode: action.payload.referralCode };
  }
  return state;
};

export default referral;
