import ms from 'milliseconds';

type Object = {
  lastError: number;
  lastFetch: number;
  loading: boolean;
  permanentFail: boolean;
  stale: boolean;
};

type Options = {
  staleTime: number;
  retryAfter: number;
  failAfter: number;
  now: number;
};

const shouldRetry = (object: Object, opts: Options) => {
  const timeSinceError = opts.now - object.lastError;
  return timeSinceError > opts.retryAfter; // && timeSinceError < opts.failAfter;
};

const isStale = (object: Object, opts: Options) => {
  const timeSinceFetch = opts.now - object.lastFetch;
  if (timeSinceFetch > opts.staleTime) {
    return true;
  }
  // Forced stale by a `markStaleWhen` action.
  if (object.stale) {
    return true;
  }
  return false;
};

export default (object: Object, opts: Options) => {
  opts = {
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
    return shouldRetry(object, opts);
  }

  // we've got data, let's fetch if it's stale
  if (object.lastFetch) {
    return isStale(object, opts);
  }

  // if no lastFetch or lastError, this is the first time
  // so we definitely want to fetch
  return true;
};
