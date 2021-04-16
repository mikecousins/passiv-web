import * as React from 'react';
import { matchSorter } from 'match-sorter';

export const useFindMatch = (term: string, list: any[], keys?: string[]) => {
  let throttledTerm = useThrottle(term, 100);
  return React.useMemo(
    () =>
      term.trim() === ''
        ? null
        : matchSorter(list, term, {
            keys,
          }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttledTerm],
  );
};

export const useThrottle = (value: any, limit: number) => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    const handler = window.setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => window.clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
};
