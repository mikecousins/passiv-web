import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectGroups, selectIsDemoMode } from '../../selectors';
import { toggleDemoMode } from '../../actions';
import SideBarLink from './SideBarLink';
import SideBarLinkAlt from './SideBarLinkAlt';
import SideBarFooter from './SideBarFooter';
import { selectLoggedIn } from '../../selectors';
import styled from '@emotion/styled';

const StyledAside = styled.aside`
  background-color: var(--brand-grey);
  color: #fff;
  width: 212px;
  height: 100%;
  padding-top: 12px;
  text-transform: uppercase;
  font-weight: 700;
  position: fixed;
  transition: 0.25s all;
  a {
    color: #fff;
    text-decoration: none;
    padding: 20px 15px 20px 25px;
    display: block;
    font-size: 1.125rem;
    widht: 100%;
    position: relative;
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
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.23);
  text-transform: none;
  font-weight: 500;
  a {
    font-size: 16px;
    padding: 17px 15px 17px 25px;
  }
`;
const SideBar = props => {
  let groups = <FontAwesomeIcon icon={faSpinner} spin />;
  if (props.groups) {
    groups = props.groups.map(group => (
      <SideBarLink
        key={group.id}
        name={group.name}
        linkPath={`/app/group/${group.id}`}
        rebalance={!!group.rebalance}
        loading={group.loading}
        setupComplete={group.setupComplete}
        spinnerLoading={true}
        hideArrow={true}
      />
    ));
  }
  if (props.loggedIn) {
    return (
      <StyledAside>
        <SideBarLink name="Dashboard" linkPath="/app/dashboard" />
        <GroupContainer>{groups}</GroupContainer>
        <SideBarLink name="Settings" linkPath="/app/settings" />
        <SideBarFooter />
      </StyledAside>
    );
  }
  return (
    <StyledAside>
      <SideBarLink name="Login" linkPath="/app/login" />
      <SideBarLink name="Sign Up" linkPath="/app/register" />
      <SideBarLinkAlt name="Reset Password" linkPath="/app/reset-password" />
      <SideBarFooter />
    </StyledAside>
  );
};

const select = state => ({
  loggedIn: selectLoggedIn(state),
  groups: selectGroups(state),
  demoMode: selectIsDemoMode(state),
});

const actions = { toggleDemo: toggleDemoMode };

export default connect(
  select,
  actions,
)(SideBar);
