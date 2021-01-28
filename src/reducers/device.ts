import { Reducer } from 'redux';

export type DeviceState = {
  token: any;
};

const initialState: DeviceState = {
  token: null,
};

type DeviceAction = {
  type: 'REMEMBER_DEVICE_SUCCEEDED' | 'REMEMBER_DEVICE_FAILED';
  payload: {
    data: {
      token: string;
      device: {
        token: string;
        expiry: string;
      };
    };
  };
};

const device: Reducer<DeviceState, DeviceAction> = (
  state = initialState,
  action: DeviceAction,
) => {
  if (action.type === 'REMEMBER_DEVICE_SUCCEEDED') {
    return {
      token: action.payload.data.device.token,
    };
  }

  if (action.type === 'REMEMBER_DEVICE_FAILED') {
    return {
      token: null,
    };
  }
  return state;
};

export default device;
