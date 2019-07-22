import { createSelector } from 'reselect';
import qs from 'qs';
import { AppState } from '../store';

export const selectRouter = (state: AppState) => state.router;

export const selectPathname = createSelector(
  selectRouter,
  router => {
    return router.location.pathname;
  },
);

export const selectQueryTokens = createSelector(
  selectRouter,
  router => {
    return qs.parse(router.location.search, {
      ignoreQueryPrefix: true,
    });
  },
);

export const selectIsEditMode = createSelector(
  selectRouter,
  router => {
    return router.location.search === '?edit=true';
  },
);
