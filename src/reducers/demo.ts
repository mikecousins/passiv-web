import { Reducer } from 'redux';

export type DemoState = boolean;

export type DemoAction = {
  type: 'TOGGLE_DEMO_MODE';
};

const demo: Reducer<DemoState, DemoAction> = (
  state: DemoState = false,
  action: DemoAction,
) => {
  if (action.type === 'TOGGLE_DEMO_MODE') {
    return !state;
  }
  return state;
};

export default demo;
