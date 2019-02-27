// This data watcher exports a function that
// should be called with a store.

// it subscribes to the store so this function
// will get called each time state may have changed
// in the store.

// We then run our selectors that determine if
// we should be fetching data and dispatch actions
// if we should.

// We do it using `requestIdleCallback` if available
// and we do it in a way that avoids duplicate dispatches
// or nested dispatches in the same call stack.
import requestIdleCallback from 'ric-shim';

export default ({ store, actionPairs }) => {
  // create list of actions that pass the selector test
  actionPairs
    .filter(item => item.selector(store.getState()))
    .forEach(item => {
      // we want to do this in an idle callback
      // (which falls back to `setTimeout(x, 0)`)
      // in order to avoid dispatching synchrounous actions
      // in a nested manner (which is poor for performance).
      // This will also minimize impact of dispatching
      // actions while scrolling on platforms where idleCallback
      // is supported.
      requestIdleCallback(
        () => {
          // sychronously make sure this is *still* true
          // right before excecuting
          const result = item.selector(store.getState())
          if (result) {
            store.dispatch(item.actionCreator(result))
          }
          // without this timeout we had a case where it just wasn't
          // ever running if you didn't interact with the browser.
        },
        { timeout: 100 }
      )
    })
}
