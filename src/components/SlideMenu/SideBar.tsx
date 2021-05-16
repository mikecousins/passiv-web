import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn, selectHasQuestradeConnection } from '../../selectors';
import {
  selectGoalsPageFeature,
  selectModelPortfolioFeature,
  selectPerformancePageFeature,
} from '../../selectors/features';
import { selectIsMobile } from '../../selectors/browser';
import SideBarLink from './SideBarLink';
import SideBarLinkAlt from './SideBarLinkAlt';
import SideBarFooter from './SideBarFooter';
import SideBarSubMenu from './SideBarSubMenu';

import SubMenuButton from './SubMenuButton';
import styled from '@emotion/styled';
import {
  DASHBOARD_PATH,
  GOALS_PATH,
  LOGIN_PATH,
  REFERRALS_PATH,
  REGISTER_PATH,
  REPORTING_PATH,
  RESET_PASSWORD_PATH,
  SETTINGS_PATH,
} from '../../apps/Paths';

const SubMenu = styled.div`
  overflow: visible;
`;
const StyledAside = styled.aside`
  background-color: var(--brand-grey);
  color: #fff;
  width: 212px;
  height: calc(100% - 150px);
  padding-top: 12px;
  font-weight: 700;
  position: fixed;
  transition: 0.25s all;
  padding-bottom: 36px;
  z-index: 3;
  @media (max-width: 900px) {
    width: 100vw;
    text-align: center;
    position: absolute;
  }
  a {
    color: #fff;
    text-decoration: none;
    padding: 14px 15px 14px 20px;
    display: block;
    font-size: 1.125rem;
    position: relative;
    strong {
      font-weight: 600;
    }
    svg {
      float: right;
    }
    &:hover {
      color: var(--brand-green);
    }
  }

  .active {
    background: var(--brand-green);
    box-shadow: -1px 2px 3px 0 rgba(0, 0, 0, 0.27);
    margin-right: -5px;
    padding-right: 5px;
    a:hover {
      color: #fff;
    }
    span {
      color: #fff;
      border-color: #fff;
    }
  }
`;

const SideBar = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const isMobile = useSelector(selectIsMobile);

  const performancePageFeatureActive = useSelector(
    selectPerformancePageFeature,
  );
  const goalsPageFeatureActive = useSelector(selectGoalsPageFeature);

  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);
  const modelPortfolioFeature = useSelector(selectModelPortfolioFeature);

  const [visible, setVisible] = useState(isMobile);
  const node = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      //@ts-ignore
      if (node?.current?.contains(e.target)) {
        return;
      }
      setVisible(false);
    });
    return () => {
      document.removeEventListener('mousedown', () => setVisible(true));
    };
  }, []);

  if (loggedIn) {
    return (
      <>
        <StyledAside>
          <SideBarLink name="Dashboard" linkPath={DASHBOARD_PATH} />
          <SubMenu ref={node}>
            <SubMenuButton
              menuVisibility={visible}
              handleMouseDown={() => setVisible(!visible)}
            />
            <SideBarSubMenu
              menuVisibility={visible}
              hideMenu={() => setVisible(false)}
            />
          </SubMenu>
          {modelPortfolioFeature && (
            <SideBarLink name="My Models" linkPath={`/app/models`} />
          )}
          {performancePageFeatureActive && hasQuestradeConnection && (
            <SideBarLink name="Reporting" linkPath={REPORTING_PATH} />
          )}
          {goalsPageFeatureActive && (
            <SideBarLink name="Goals" linkPath={GOALS_PATH} />
          )}
          <SideBarLink name="Settings" linkPath={SETTINGS_PATH} />
          <SideBarLink name="Refer a Friend" linkPath={REFERRALS_PATH} />
        </StyledAside>
        <SideBarFooter />
      </>
    );
  }

  return (
    <>
      <StyledAside>
        <SideBarLink name="Login" linkPath={LOGIN_PATH} />
        <SideBarLink name="Sign Up" linkPath={REGISTER_PATH} />
        <SideBarLinkAlt name="Reset Password" linkPath={RESET_PASSWORD_PATH} />
      </StyledAside>
      <SideBarFooter />
    </>
  );
};

export default SideBar;
