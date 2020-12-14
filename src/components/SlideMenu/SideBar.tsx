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
import Tour from '../Tour/Tour';
import {
  DASHBOARD_PATH,
  GOALS_PATH,
  GROUP_PATH,
  LOGIN_PATH,
  REFERRALS_PATH,
  REGISTER_PATH,
  REPORTING_PATH,
  RESET_PASSWORD_PATH,
  SETTINGS_PATH,
} from '../../apps/Paths';

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
const GroupContainer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.23);
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.23);
  margin-bottom: 10px;
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
  const STEP = [
    {
      title: (
        <p style={{ fontSize: '25px', fontWeight: 900 }}>
          New Year, New Goals{' '}
          <span role="img" aria-label="tada-emoji">
            {' '}
            🎉
          </span>
        </p>
      ),
      target: '.tour-goals-feature',
      content: (
        <div>
          Start the year right and set your investment goals with our new Goals
          feature!{' '}
          <a href="https://passiv.com/help/tutorials/how-to-set-up-goals-and-track-your-progress/">
            Learn More
          </a>
        </div>
      ),
      placement: 'right',
      hideCloseButton: true,
      styles: {
        tooltip: {
          fontSize: 20,
        },
      },
    },
  ];
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
            linkPath={`${GROUP_PATH}/${group.id}`}
            rebalance={!!group.rebalance}
            hasAccounts={group.hasAccounts}
            loading={group.loading}
            setupComplete={group.setupComplete}
            spinnerLoading={true}
            hideArrow={true}
            onMouseEnter={() =>
              preloadRouteComponent(`${GROUP_PATH}/${group.id}`)
            }
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
          <Tour steps={STEP} name="goals_new_feature" />
          <SideBarLink
            name="Dashboard"
            linkPath={DASHBOARD_PATH}
            onMouseEnter={() => preloadRouteComponent(DASHBOARD_PATH)}
          />
          {groups && groups.length > 0 && (
            <GroupContainer>{groupList}</GroupContainer>
          )}
          {performancePageFeatureActive && hasQuestradeConnection && (
            <SideBarLink
              name="Reporting"
              linkPath={REPORTING_PATH}
              onMouseEnter={() => preloadRouteComponent(REPORTING_PATH)}
            />
          )}
          {goalsPageFeatureActive && (
            <SideBarLink
              name="Goals"
              linkPath={GOALS_PATH}
              beta={true}
              onMouseEnter={() => preloadRouteComponent(GOALS_PATH)}
            />
          )}
          <SideBarLink
            name="Refer a Friend"
            linkPath={REFERRALS_PATH}
            onMouseEnter={() => preloadRouteComponent(REFERRALS_PATH)}
          />
          <SideBarLink
            name="Settings"
            linkPath={SETTINGS_PATH}
            onMouseEnter={() => preloadRouteComponent(SETTINGS_PATH)}
          />
        </StyledAside>
        <SideBarFooter />
      </>
    );
  }

  return (
    <>
      <StyledAside>
        <SideBarLink
          name="Login"
          linkPath={LOGIN_PATH}
          onMouseEnter={() => preloadRouteComponent(LOGIN_PATH)}
        />
        <SideBarLink
          name="Sign Up"
          linkPath={REGISTER_PATH}
          onMouseEnter={() => preloadRouteComponent(REGISTER_PATH)}
        />
        <SideBarLinkAlt
          name="Reset Password"
          linkPath={RESET_PASSWORD_PATH}
          onMouseEnter={() => preloadRouteComponent(RESET_PASSWORD_PATH)}
        />
      </StyledAside>
      <SideBarFooter />
    </>
  );
};

export default SideBar;
