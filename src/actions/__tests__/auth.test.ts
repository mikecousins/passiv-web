import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'jest-mock-axios';
import realStore, { AppState } from '../../store';
import { loginSucceeded } from '../../actions';

type DispatchExts = ThunkDispatch<AppState, void, AnyAction>;
const middlewares = [thunk];
const mockStore = configureMockStore<AppState, DispatchExts>(middlewares);

describe('Auth actions', () => {
  afterEach(() => {
    axios.reset();
  });

  it('Login succeeded action', () => {
    const expectedAction = [{ type: 'LOGIN_SUCCEEDED', payload: 'jwt' }];

    const initialState = realStore.getState();
    const store = mockStore(initialState);

    store.dispatch(loginSucceeded('jwt'));

    // the proper sub-action should be dispatched
    expect(store.getActions()).toEqual(expectedAction);
  });
});
