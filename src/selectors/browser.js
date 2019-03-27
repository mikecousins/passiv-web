import { createSelector } from 'reselect';

export const selectBrowser = state => state.browser;

export const selectIsMobile = createSelector(
  selectBrowser,
  (browser) => {
    return browser.is.extraSmall;
  }
);
