import { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectPathname } from '../selectors/router';
import { selectIsMobile } from '../selectors/browser';
import { AppState } from '../store';

type Props = {
  pathname: string;
  isMobile: boolean;
};

const ScrollHelper = ({ pathname, isMobile }: Props) => {
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isMobile]);
  return null;
};

const select = (state: AppState) => ({
  pathname: selectPathname(state),
  isMobile: selectIsMobile(state),
});

export default connect(select)(ScrollHelper);
