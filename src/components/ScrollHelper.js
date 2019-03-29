import { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectPathname } from '../selectors/router';
import { selectIsMobile } from '../selectors/browser';

export const ScrollHelper = ({ pathname, isMobile }) => {
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isMobile]);
  return null;
};

const select = state => ({
  pathname: selectPathname(state),
  isMobile: selectIsMobile(state),
});

export default connect(select)(ScrollHelper);
