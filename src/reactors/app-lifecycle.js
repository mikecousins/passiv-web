import { APP_IDLE } from './actions';

export const appIdle = (now = Date.now()) => {
  return { type: APP_IDLE, payload: now }
}
