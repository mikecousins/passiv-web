import store from '../../store';
import { selectToken, selectLoggedIn } from '..';

describe('app selectors', () => {
  it('select logged in', () => {
    const state = JSON.parse(JSON.stringify(store.getState()));
    state.auth.token = 'jwt';
    expect(selectLoggedIn(state)).toEqual(true);
  });

  it('select token', () => {
    const state = JSON.parse(JSON.stringify(store.getState()));
    state.auth.token = 'jwt';
    expect(selectToken(state)).toEqual('jwt');
  });
});
