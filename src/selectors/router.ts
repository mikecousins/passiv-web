import { createSelector } from 'reselect';
import qs from 'qs';
import { AppState } from '../store';
import { RouterState } from 'connected-react-router';

export const selectRouter = (state: AppState) => state.router;

export const selectPathname = createSelector<AppState, RouterState, string>(
  selectRouter,
  router => {
    return router.location.pathname;
  },
);

export const selectQueryTokens = createSelector<AppState, RouterState, any>(
  selectRouter,
  router => {
    return qs.parse(router.location.search, {
      ignoreQueryPrefix: true,
    });
  },
);

export const selectIsEditMode = createSelector<AppState, RouterState, boolean>(
  selectRouter,
  router => {
    return router.location.search === '?edit=true';
  },
);
