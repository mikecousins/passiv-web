// taken from https://github.com/naugtur/human-redux-reactor/blob/master/index.js
// went this way because the package doesn't work with create-react-app

import safeMemoryCache from 'safe-memory-cache/map';
import requestIdleCallback from 'ric-shim';

function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
      func.apply(this, arguments);
    }, delay);
  };
}

export const addReactorsToStore = ({ store, reactors, runIdle, idleInterval, throttle, dev }) => {
  const aCache = safeMemoryCache({ maxTTL: throttle || 1000 });
  function uniqueInTime(str) {
    if (!aCache.get(str)) {
      aCache.set(str, true);
      return true;
    }
    if (dev) { console.log('human-redux-reactor: stopped ' + str + ' from repeating.') }
  }

  if (runIdle) {
    const idler = debounce(() => store.dispatch({ type: "@@IDLE" }), idleInterval || 30000);
    store.subscribe(idler);
  }
  store.subscribe(() => {
    const currentState = store.getState();
    let result;
    const found = reactors.some(reactor => {
      result = reactor(currentState);
      return !!result && uniqueInTime(result.type);
    });
    if (found) {
      requestAnimationFrame(() =>
        requestIdleCallback(
          () => {
            store.dispatch(result);
          },
          { timeout: 500 }
        )
      );
    }
  });
};
