import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, Action, combineReducers } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import asyncSessionStorage from 'redux-persist/lib/storage';
import { responsiveStoreEnhancer } from 'redux-responsive';
import createRootReducer from '../reducers';
import apiMiddleware from '../middleware/api';
import storage from 'redux-persist/lib/storage';
import device from '../reducers/device';

export const history = createBrowserHistory();

const defaultState = {};

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  blacklist: [
    'appTime',
    'router',
    'browser',
    'updateServiceWorker',
    'online',
    'device',
  ],
};

const devicePersistConfig = {
  key: 'device',
  storage: storage,
};

// create our root reducer
const other = createRootReducer(history);
const rootReducer = combineReducers({
  device: persistReducer(devicePersistConfig, device),
  other,
});

// export the type for usage elsewhere
export type AppState = ReturnType<typeof rootReducer>;
export type State = ReturnType<typeof other>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const store = createStore(
  persistedReducer,
  defaultState,
  composeEnhancers(
    responsiveStoreEnhancer,
    applyMiddleware(
      routerMiddleware(history),
      reduxThunk as ThunkMiddleware<AppState, Action<any>>,
      apiMiddleware,
    ),
  ),
);

export default store;
