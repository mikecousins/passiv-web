export interface SimpleState<T> {
  data: T | null;
  lastError: number | null;
  error: object | null;
  lastFetch: number | null;
  loading: boolean;
  stale: boolean;
  permanentFail: boolean;
}
