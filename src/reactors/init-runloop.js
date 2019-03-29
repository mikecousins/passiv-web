import debounce from 'lodash-es/debounce';
import ms from 'milliseconds';
import { appIdle } from './app-lifecycle';
import runDataChecks from './run-data-checks';

export default function RunLoop() {
  const actionPairs = [];

  const start = function(store, pairs) {
    pairs.forEach(effect => {
      actionPairs.push(effect);
    });
    const idleDispatcher = debounce(() => {
      requestAnimationFrame(() => store.dispatch(appIdle()));
    }, ms.seconds(30));

    const callback = () => {
      runDataChecks({ store, actionPairs });
      idleDispatcher();
    };

    store.subscribe(callback);
    // kick things off even without events getting fired
    callback();
  };

  const addEffects = function(effects) {
    effects.forEach(effect => {
      actionPairs.push(effect);
    });
  };

  return {
    start,
    addEffects,
  };
}
