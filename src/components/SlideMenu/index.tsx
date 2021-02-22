import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import MenuButton from './MenuButton';
import Menu from './Menu';
import { selectIsMobile } from '../../selectors/browser';
import { selectPathname } from '../../selectors/router';
import Tour from '../Tour/Tour';

const StyledSlideMenu = styled.div`
  position: relative;
  top: 0;
  left: 0;
  z-index: 5;
  min-height: 100vh;
`;
const TOUR_STEPS = [
  {
    target: '.tour-hide_accounts',
    content: '',
    placement: 'top',
  },
];
export const SlideMenu = () => {
  const isMobile = useSelector(selectIsMobile);
  const pathname = useSelector(selectPathname);
  const [visible, setVisible] = useState(!isMobile);
  const [oldPath, setPath] = useState(pathname);

  // check our path to see if it's changed
  // if it has and we're on mobile, close the menu
  if (isMobile && oldPath !== pathname) {
    setPath(pathname);
    setVisible(false);
  }

  if (oldPath !== pathname && pathname === '/app/demo') {
    setPath(pathname);
    setVisible(false);
  }

  return (
    <StyledSlideMenu>
      {visible && <Tour steps={TOUR_STEPS} name="hide_accounts_indicator" />}
      <MenuButton
        menuVisibility={visible}
        handleMouseDown={() => setVisible(!visible)}
      />
      <Menu menuVisibility={visible} />
    </StyledSlideMenu>
  );
};

export default SlideMenu;
