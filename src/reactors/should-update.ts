import ms from 'milliseconds';
import { SimpleState } from '../types/common';

type Options = {
  staleTime?: number;
  retryAfter?: number;
  failAfter?: number;
  now?: number;
};

type CleanedOptions = {
  staleTime: number;
  retryAfter: number;
  failAfter: number;
  now: number;
};

const shouldRetry = (object: SimpleState<any>, opts: CleanedOptions) => {
  const timeSinceError = opts.now - (object.lastError || 0);
  return timeSinceError > opts.retryAfter; // && timeSinceError < opts.failAfter;
};

const isStale = (object: SimpleState<any>, opts: CleanedOptions) => {
  const timeSinceFetch = opts.now - (object.lastFetch || 0);
  if (timeSinceFetch > opts.staleTime) {
    return true;
  }
  // Forced stale by a `markStaleWhen` action.
  if (object.stale) {
    return true;
  }
  return false;
};

export default (object: SimpleState<any>, opts: Options) => {
  const cleanedOpts: CleanedOptions = {
    staleTime: ms.minutes(10),
    retryAfter: ms.minutes(1),
    failAfter: ms.minutes(3),
    now: Date.now(),
    ...opts,
  };

  // if there's nothing selected or we're currently
  // fetching or we've determined this item is unfetchable
  // do nothing
  if ((object && object.loading) || (object && object.permanentFail)) {
    return false;
  }

  if (!object) {
    return true;
  }

  // last time we tried it failed, doesn't matter if we have
  // data or not, we just want to retry if we're past the
  // `retryAfter` time.
  if (object.lastError) {
    // we don't have data but we must have had an error if we
    // got this far so we want to try to recover and give up eventually
    return shouldRetry(object, cleanedOpts);
  }

  // we've got data, let's fetch if it's stale
  if (object.lastFetch) {
    return isStale(object, cleanedOpts);
  }

  // if no lastFetch or lastError, this is the first time
  // so we definitely want to fetch
  return true;
};
