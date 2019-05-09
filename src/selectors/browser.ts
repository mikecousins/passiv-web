import { createSelector } from 'reselect';
import { AppState } from '../store';

export const selectBrowser = (state: AppState) => state.browser;

export const selectIsMobile = createSelector(
  selectBrowser,
  browser => {
    return browser.is.extraSmall;
  },
);
