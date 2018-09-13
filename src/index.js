import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import 'ric';
import { addReactorsToStore } from './reactors/HumanRedux';
import rootReducer from './reducers';
import { loadData } from './reactors';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

const defaultState = {
  auth: {
    token: null,
  }
};

const store = createStore(
  connectRouter(history)(rootReducer),
  defaultState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      reduxThunk,
      logger
    )
  )
);

addReactorsToStore({
  store: store,
  reactors: [ loadData ],
  runIdle: true,
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
