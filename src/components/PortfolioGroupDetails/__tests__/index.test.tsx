import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import createRootReducer from '../../../reducers';
import AccountName from '../AccountName';

afterEach(cleanup);

const renderWithRedux = (ui: JSX.Element, initialState: object) => {
  const history = createMemoryHistory();
  const reducer = createRootReducer(history);
  const store = createStore(reducer, initialState);
  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>{ui}</Provider>
      </Router>,
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
};

test('AccountName renders without issue', () => {
  const { getByText } = renderWithRedux(<AccountName name="foobar" />, {});

  expect(getByText('foobar')).toBeTruthy();
});
