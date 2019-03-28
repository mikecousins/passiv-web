import { createSelector } from 'reselect';

export const selectRouter = state => state.router;

export const selectPathname = createSelector(
  selectRouter,
  (router) => {
    return router.location.pathname;
  }
);
