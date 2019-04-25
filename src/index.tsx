import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { responsiveStoreEnhancer } from 'redux-responsive';
import createRootReducer from './reducers';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
// import registerServiceWorker from './registerServiceWorker';
// import { updateServiceWorker } from './actions';
import apiMiddleware from './middleware/api';
import createRunLoop from './reactors/init-runloop';
import { effects } from './reactors/effects';

Sentry.init({
  dsn: 'https://0d88597b9cb6439fa0050392b907ec17@sentry.io/1358976',
});

const history = createBrowserHistory();

const defaultState = {};

// initialize GA and fire first pageview
ReactGA.initialize(
  [
    {
      trackingId:
        process.env.NODE_ENV === 'production'
          ? 'UA-113321962-1'
          : 'UA-113321962-2',
      gaOptions: {},
    },
  ],
  {
    debug: process.env.NODE_ENV === 'production' ? false : true,
  },
);
ReactGA.pageview(window.location.pathname + window.location.search);

// get GA to listen for path changes
history.listen(function(location) {
  ReactGA.pageview(location.pathname + location.search);
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['appTime', 'router', 'browser', 'updateServiceWorker'],
};

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history),
);

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const store = createStore(
  persistedReducer,
  defaultState,
  composeEnhancers(
    responsiveStoreEnhancer,
    applyMiddleware(routerMiddleware(history), reduxThunk, apiMiddleware),
  ),
);

const persistor = persistStore(store);

// create our run loop that loads our data
const runLoop = createRunLoop();
runLoop.start(store, effects);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);

// TODO enable when we have our semver updates figured out
/*
const onUpdate = () => {
  store.dispatch(updateServiceWorker());
};

registerServiceWorker(onUpdate);
*/
