import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectLoggedIn, selectHasQuestradeConnection } from '../../selectors';
import {
  selectGoalsPageFeature,
  selectPerformancePageFeature,
} from '../../selectors/features';
import { selectGroups } from '../../selectors/groups';
import SideBarLink from './SideBarLink';
import SideBarLinkAlt from './SideBarLinkAlt';
import SideBarFooter from './SideBarFooter';
import styled from '@emotion/styled';
import { preloadRouteComponent } from '../../apps/App';

const StyledAside = styled.aside`
  background-color: var(--brand-grey);
  color: #fff;
  width: 212px;
  height: calc(100% - 150px);
  padding-top: 12px;
  font-weight: 700;
  position: fixed;
  transition: 0.25s all;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 36px;

  a {
    color: #fff;
    text-decoration: none;
    padding: 20px 15px 20px 20px;
    display: block;
    font-size: 1.125rem;
    position: relative;
    strong {
      font-weight: 600;
    }
    svg {
      float: right;
    }
  }
  .active {
    background: var(--brand-green);
    box-shadow: -1px 2px 3px 0 rgba(0, 0, 0, 0.27);
    margin-right: -5px;
    padding-right: 5px;
  }
`;
const GroupContainer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.23);
  padding-top: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.23);
  text-transform: none;
  font-weight: 500;
  a {
    font-size: 16px;
    padding: 10px 15px 10px 20px;
    margin: 3px 0 3px;
    font-weight: 300;
  }
`;

const SideBar = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const groups = useSelector(selectGroups);
  const performancePageFeatureActive = useSelector(
    selectPerformancePageFeature,
  );
  const goalsPageFeatureActive = useSelector(selectGoalsPageFeature);

  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);

  let groupList: JSX.Element | JSX.Element[] = (
    <FontAwesomeIcon icon={faSpinner} spin />
  );

  if (groups) {
    groupList = groups.map((group) => {
      return (
        <React.Fragment key={group.id}>
          <SideBarLink
            key={group.id}
            name={group.name}
            linkPath={`/app/group/${group.id}`}
            rebalance={!!group.rebalance}
            hasAccounts={group.hasAccounts}
            loading={group.loading}
            setupComplete={group.setupComplete}
            spinnerLoading={true}
            hideArrow={true}
          />
          {group.hasAccounts &&
            group.accounts.map((account) => (
              <SideBarLink
                key={account.id}
                name={account.name}
                linkPath={`/app/group/${group.id}/account/${account.id}`}
                hideArrow={true}
                indent={true}
              />
            ))}
        </React.Fragment>
      );
    });
  }
  if (loggedIn) {
    return (
      <>
        <StyledAside>
          <SideBarLink name="Dashboard" linkPath="/app/dashboard" />
          {groups && groups.length > 0 && (
            <GroupContainer>{groupList}</GroupContainer>
          )}
          {performancePageFeatureActive && hasQuestradeConnection && (
            <SideBarLink name="Reporting" linkPath="/app/reporting" />
          )}
          {goalsPageFeatureActive && hasQuestradeConnection && (
            <SideBarLink name="Goals" linkPath="/app/goals" beta={true} />
          )}
          <SideBarLink
            name="Refer a Friend"
            linkPath="/app/referrals"
            onMouseEnter={() => preloadRouteComponent('/app/referrals')}
          />
          <SideBarLink name="Settings" linkPath="/app/settings" />
        </StyledAside>
        <SideBarFooter />
      </>
    );
  }
  return (
    <>
      <StyledAside>
        <SideBarLink name="Login" linkPath="/app/login" />
        <SideBarLink name="Sign Up" linkPath="/app/register" />
        <SideBarLinkAlt name="Reset Password" linkPath="/app/reset-password" />
      </StyledAside>
      <SideBarFooter />
    </>
  );
};

export default SideBar;
