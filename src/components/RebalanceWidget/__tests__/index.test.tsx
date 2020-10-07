import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import createRootReducer from '../../../reducers';
import RebalanceWidget from '../';
import ErrorMessage from '../ErrorMessage';
import OrderImpact from '../OrderImpact';
import OrderImpacts from '../OrderImpacts';

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

test('RebalanceWidget renders without issue', () => {
  const { getByText } = renderWithRedux(
    <RebalanceWidget
      groupId=""
      trades={{}}
      tradesTrigger={() => {}}
      tradesUntrigger={() => {}}
    />,
    {},
  );

  expect(getByText('Preview Orders')).toBeTruthy();
});

test('ErrorMessage renders without issue', () => {
  const { getByText } = renderWithRedux(
    <ErrorMessage error={{}} groupId="" closeWidget={() => {}} />,
    {},
  );

  expect(getByText('Order cannot be Processed')).toBeTruthy();
});

test('OrderImpact renders without issue', () => {
  const { container } = renderWithRedux(<OrderImpact impacts={[{}]} />, {});

  expect(container).toBeTruthy();
});

test('OrderImpacts renders without issue', () => {
  const { getByText } = renderWithRedux(<OrderImpacts impacts={[]} />, {});

  expect(getByText('Estimated results')).toBeTruthy();
});
