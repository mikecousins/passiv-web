import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import decode from 'jwt-decode';
import isFuture from 'date-fns/is_future';
import { addReactorsToStore } from './reactors/HumanRedux';
import rootReducer from './reducers';
import { loadData } from './reactors';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

let token = null;
const localToken = localStorage.getItem('jwt');
if (localToken) {
  const decodedToken = decode(localToken);
  const expiryDate = new Date(decodedToken.exp * 1000);
  if (isFuture(expiryDate)) {
    token = localToken;
  }
}

const defaultState = {
  auth: {
    token,
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
