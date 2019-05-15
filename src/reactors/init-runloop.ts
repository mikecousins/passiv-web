import ms from 'milliseconds';
import { OutputSelector } from 'reselect';
import { ThunkAction } from 'redux-thunk';
import { Action, Store, ActionCreator } from 'redux';
import { appIdle } from './app-lifecycle';
import runDataChecks from './run-data-checks';

const debounce = (callback: any, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

export type ActionPair = {
  selector: OutputSelector<any, any, any>;
  actionCreator: ActionCreator<ThunkAction<void, void, void, Action>>;
};

export default function RunLoop() {
  const actionPairs: ActionPair[] = [];

  const start = (store: Store, pairs: ActionPair[]) => {
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

  const addEffects = (effects: ActionPair[]) => {
    effects.forEach(effect => {
      actionPairs.push(effect);
    });
  };

  return {
    start,
    addEffects,
  };
}
